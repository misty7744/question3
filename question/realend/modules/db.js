const mysql = require("mysql");

var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"021118",
    port:3306,
    database:"question",
    connectionLimit:10000000000000000,
    multipleStatements:true,
})
class DB{
        static getInstance(){
            if(!DB.instance){
                DB.instance = new DB();
            }
            return DB.instance;         
        }
  showTime(target){
      return new Promise((resolve,reject)=>{
         pool.getConnection((err,connection)=>{
             if(err){
                 reject(err);
                 console.log("no1:未连接数据库成功");
                 return;
             }
             connection.query(target.sql,target.params,(err,result)=>{
                     
                 if(err){
                    reject(err);
                    console.log("no2:操作数据库出现错误");
                    return;
                }        
                resolve(result);
             })
         })
     })
  }

    find(what,where,rule){    
        var a = "select "+what+" from "+where+" where "+rule;
        console.log(a);
        var b = [];
        var dx = {
            sql:a,
            params:b
        }
    return this.showTime(dx);       
    }
    insert(towhere,key,params){    
        var temp = "";
        for(var i=0;i<params.length-1;i++){
            temp=temp+'?,';
        }
        var final= temp+'?';
        var a = `INSERT INTO ${towhere}(${key}) VALUES(${final})`;
        var b = params;
        var c = {
            sql:a,
            params:b,
        }
        return this.showTime(c);
    }
    insertone(towhere,key,params){       
        var a = `INSERT INTO ${towhere}(${key}) VALUES(${params})`;
        var b = params;
        var c = {
            sql:a,
            params:b,
        }
        return this.showTime(c);
    }
    async delete(fwhere,rules){
        var a = `delete from ${fwhere} where ${rules}`;
        var b = [];
        var target = {
            sql:a,
            params:b,
        };
        return this.showTime(target);
    }
   update(params,towhere,changes,rules){
        var a = `UPDATE ${towhere} SET ${changes} WHERE ${rules}`;
        var b = params;
        var c = {
            sql:a,
            params:b
        }
        return this.showTime(c);
    }
}
var a = DB.getInstance();
 var target = {
            sql:"select * from question_catagory",
            params:[],
        };
module.exports = DB.getInstance();
