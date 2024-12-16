const db = require('../../../modules/db');
const router = require ('koa-router')();
let bodyParser=require('koa-bodyparser');

router.get('/',async(ctx) =>{
    ctx.response.body = await db.find('*','question',true)
})
router.get('/add',async(ctx)=>{  
    var value_list=[]
    var key_str=''
    value_list.push(ctx.request.body.catagory_id,ctx.request.body.question_Title,ctx.request.body.type,ctx.request.body.answer,ctx.request.body.analysis)
    for (var key in ctx.request.body){
        key_str=key_str + key+','
        
    }
    key_str = key_str.substring(0, key_str.length - 1);    
    let data=await db.insert('question',key_str,value_list)
    console.log(data)    
})
router.post('/delete',async(ctx)=>{   
    for (var key in ctx.request.body){
        var key_str=key
    }
    var value_str = ctx.request.body.question_id
    var _rule = key_str + '=' +value_str
    let data = await db.delete('question',_rule)   
})
router.get('/find_Title',async(ctx)=>{    
    for (var key in ctx.request.body){
        var key_str=key
    }
    var value_str ="'" +ctx.request.body.question_Title + "'"
    var _rule = key_str + '=' + value_str
    let data = await db.find('*','question',_rule)
    console.log(data)

})
router.get('/find_id',async(ctx)=>{    
    for (var key in ctx.request.body){
        var key_str=key
    }
    var value_str ="'" +ctx.request.body.question_id + "'"
    var _rule = key_str + '=' + value_str
    let data = await db.find('*','question',_rule)
    console.log(data)

})
router.get('/update',async(ctx)=>{          

    var sql =ctx.request.body.sql
    var value_list = ctx.request.body.params
    var _rule = "question_id" +"="+ ctx.request.body.question_id
    let data = await db.update(value_list,"question",sql,_rule)
    console.log(data);  
})


module.exports = router.routes()