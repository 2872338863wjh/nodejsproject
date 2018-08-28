const express = require("express");
const path = require("path");
const captchapng = require("captchapng");
//链接数据库
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

//
const dbName = "szhmqd21";

//登陆模块
module.exports.loginpage = (req, res) => {
  res.sendFile(path.join(__dirname, "../statics/views/login.html"));
};
//注册模块
module.exports.registerpage = (req, res) => {
  res.sendFile(path.join(__dirname, "../statics/views/register.html"));
};

//注册模块的操作
module.exports.registerpostpage = (req, res) => {
  console.log(req.body);
  //返回一个数据
  const rturn = { status: 0, message: "注册成功" };

  // //判断数据是否存在
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      const collection = db.collection("accountinfo");
      //查询
      collection.findOne({ username: req.body.username }, (err, doc) => {
        //如果输入的数据有值
       
        if (doc) {
            client.close();
          //改变它的状态,
          rturn.status = 1;
          rturn.message = "已经存在";
          res.json(rturn);
        } else {
          collection.insertOne(req.body, (err, result) => {
            client.close();
            if (result == null) {
              rturn.status = 2;
              rturn.message = "注册失败";
            }
            res.json(rturn);
          });
       
        }
      });
    }
  );
 };

//验证码

exports.getvcodeimg = (req, res) => {
  const vcode = parseInt(Math.random() * 9000 + 1000);

  // 把刚刚随机生成的验证码，存储到session中
  req.session.vcode1 = vcode;

  var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};

//登录
module.exports.getloginpage = (req, res) => {
  //获取验证码
  console.log(req.body);
  ////返回一个数据
  const rturn = { status: 0, message: "登陆成功" };
  //如果输入的验证码不等于session的验证码时
  if (req.body.vcode !== req.session.vcode1) {
    rturn.status = 1;
    rturn.message = "验证码错误";
    res.json(rturn);
    return;
  } else {
    //去数据库验证用户名和密码
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection("accountinfo");
        collection.findOne(
          { username: req.body.username, password: req.body.password },
          (err, doc) => {
            client.close();
            if (doc == null) {
              rturn.status = 2;
              rturn.message = "用户名或密码错误";
            }
            res.json(rturn);
          }
        );
      }
    );
  }
};
