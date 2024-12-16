const router = require ('koa-router')()
const db = require('../modules/db')

router.get('/',async(ctx) =>{    
    let a  = await db.find('*','question_catagory',true)
    let c = [];
    for(i=0;i<a.length;i++){
        if (a[i].parent_id == null){
            c[i]=a[i];           
            c[i].que_list = []
            for(b = 0;b<a.length;b++){
                if(a[b].father_cid == a[i].catagory_id)
                    {c[i].que_list.push(a[b])                     
                    }
        }
    } 
}
ctx.response.body = c;
console.log(c);
})
router.get('/catagory/:aid',async(ctx,next)=>{  
    var _rule=ctx.params.aid
    let final = await db.find('*','question_catagory',`catagory_id=${_rule}`)
    ctx.response.body = final;
 })
router.get('/catagory/:aid/:aic',async(ctx,next)=>{
    var _rule=ctx.params.aic
    let final = await db.find('*','question',`catagory_id=${_rule}`)  
    let c1 = await db.find('catagory_name','question_catagory',`catagory_id=${ctx.params.aid}`)  
    let c2 = await db.find('catagory_name','question_catagory',`catagory_id=${ctx.params.aic}`)  
    console.log(c1,c2);

    ctx.body = {
        final,
        c1,
        c2
    }
})
router.get('/catagory/:aid/:aic/:aib',async(ctx,next)=>{ 
    var _rule = ctx.params.aib;
    let final = await db.find('*','question',`question_id=${_rule}`)
    console.log(final)
    let final2 = await db.find('*','bx_answer',`question_id=${_rule} order by bx_Order`)
    let panel = {question:[],check:[]};
    panel.question = final;
    panel.check = final2;
    ctx.response.body = panel;
})
router.post('/s',async(ctx,next)=>{
    let str = ctx.request.body.like_str
    if(str === undefined){
        let result = await db.find('*','question',`question_id < 10`)
        ctx.body = {
            result
        }
    }else if(ctx.request.body.catagory_id){
        let father_cid = ctx.request.body.catagory_id
        let idArr = await db.find('catagory_id','question_catagory',`father_cid = ${father_cid}`)
        console.log(idArr);
        let id_arr = []
        idArr.forEach(item => {
            id_arr.push(item.catagory_id) 
        });
        let id_Arr = id_arr.join(',')
        console.log(id_Arr);
        let result = await db.find('*','question',`question_Title like '%${str}%' and catagory_id in (${id_Arr})`)
        if (result.length) {
            console.log(result);
            ctx.body = {
                result
            }
        }else{
            let result = 0
            ctx.body = {
                result
            }
        }

    } else {
        let result = await db.find('*','question',`question_Title like '%${str}%'`)
        console.log(result);
        ctx.body = {
            result
        }
    }

})
router.post('/doLogin',async(ctx,next)=>{
    let contectInfo = ctx.request.body.contectInfo
    let pass = ctx.request.body.pass
    let result = await db.find('*','manager',` contectInfo='${contectInfo}' AND pass = '${pass}'`)
    if(result[0]){
        ctx.body={
            code:1
        }
    }else{
        ctx.body={
            code:0
        }
    }
})
router.post('/doRegister',async(ctx,next)=>{
    let name = ctx.request.body.name
    let contectInfo = ctx.request.body.contectInfo
    let pass = ctx.request.body.pass
    console.log(name,contectInfo,pass)
    let result = await db.insertone('manager','NAME,contectInfo,pass',` '${name}','${contectInfo}','${pass}'`)
    ctx.body={
        code:1
    }
})
module.exports = router.routes()