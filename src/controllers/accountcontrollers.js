const express=require("express");
const path=require("path")


//登陆模块
module.exports.loginpage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/login.html"));
}
//注册模块
module.exports.registerpage=(req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/register.html"));
}