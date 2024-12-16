const Koa=require('koa')
const router=require('koa-router')()
const render = require('koa-art-template')
const path=require('path');
const bodyParser=require('koa-bodyparser')
const cors = require('koa2-cors') 

let app = new Koa()

app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'views'),   
    extname: '.html',  
    debug: process.env.NODE_ENV !== 'production'  
});











let index= require('./routes/index')
let question_admin = require('./routes/admin/question/question_admin')
let catagory_admin = require('./routes/admin/question/catagory_admin')

router.use(index)
router.use('/question_admin',question_admin)
router.use('/catagory_admin',catagory_admin)

app.use(cors())
app.use(cors({
    origin:function (ctx) { 
            return "*";
    },
    exposeHeaders: ['WWW-Authenticate','Server-Authorization'],
    maxAge: 1000000,
    credentials:true,
    allowMethods: ['GET','POST','DELETE'],
    allowHeaders: ['Content-Type','Authorization','Accept'],
}))
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000)