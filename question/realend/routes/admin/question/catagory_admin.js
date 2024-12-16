const db = require('../../../modules/db');
const router = require ('koa-router')();
let bodyParser=require('koa-bodyparser');

router.get('/',async(ctx) =>{
    ctx.response.body = await db.find('*','question_catagory',true)    
    console.log(ctx.body)
})
router.post('/addcatagory',async(ctx)=>{  

    
    var value_list=[]
    var key_str=''
    value_list.push(ctx.request.body.catagory_id,ctx.request.body.parent_id,ctx.request.body.catagory_name,ctx.request.body.shunxu,ctx.request.body.father_id)
    for (var key in ctx.request.body){
        key_str=key_str + key+','
    }
    
    key_str = key_str.substring(0, key_str.length - 1); 
    let data=await db.insert('question_catagory',key_str,value_list)
    
})
router.get('/change_shunxu',async(ctx)=>{
    var i1 = ctx.request.body.id1
    var i2 = ctx.request.body.id2
    var order1 = await db.find('*','question_catagory',`catagory_id=${i1}`).shunxu
    var order2 = await db.find('*','question_catagory',`catagory_id=${i2}`).shunxu 
    var _r1 = "catagory_id" +"="+ ctx.request.body.id1
    var _r2 = "catagory_id" +"="+ ctx.request.body.id2
    var temp = []
    let d1 = await db.update(temp.push(order2),'question_catagory','shunxu=?',_r1)
    let d2 = await db.update(temp.push(order1),'question_catagory','shunxu=?',_r2)
    console.log(d1,d2)
})
module.exports = router.routes()