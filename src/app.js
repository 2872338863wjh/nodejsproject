// 导入
const express=require("express");
const path =require("path");
const bodyParser = require('body-parser');
const session = require('express-session');


const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//导入路由
const  accountrouters=require(path.join(__dirname,"./routers/accountrouters.js"));
//使用中间件
app.use("/account",accountrouters);


//开启服务
app.listen(8899,"127.0.0.1",err=>{
    if(err){
        console.log(err)
    }else{
        console.log("write OK");
    }
})