// 导入
const express=require("express");
const path =require("path");

const app=express();

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