//导入
const express=require("express");
const path=require("path");

const router = express.Router();


//导入控制器
const accountrounter=require(path.join(__dirname,"../controllers/accountcontrollers"));
//登陆界面
router.get("/login",accountrounter.loginpage );
//注册模块
router.get("/register",accountrounter.registerpage );
//操作注册模块
router.post("/register",accountrounter.registerpostpage);
//验证码
router.get("/vcode",accountrounter.getvcodeimg);
//登录
// router.post("/login",accountrounter.getloginpage );

//暴露路由
module.exports=router;
