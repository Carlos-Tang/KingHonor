//登录注册入口
const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { md5 } = require('utility');
// 创建路由实例，实际是一个函数
const router = express.Router();

//-------------------注册接口----------
//请求体:username,password
router.post('/register', (req, res) => {
  //接收数据
  // console.log(req.body);
  // let username = req.body.username;
  // let password = req.body.password;
  let { username, password } = req.body;
  password = md5(password);
  //判断是否被占用
  db(`select * from user where username='${username}'`, (err, result) => {
    if (err) throw err;
    if (result.length > 0)
      res.send({ status: 1, message: '用户名已被占用' });
    else {
      //加入数据库
      db(`insert into user set username='${username}',password='${password}'`, (e, r) => {
        if (e) throw e;
        res.send({ status: 0, message: '注册成功' })
      })
    }
  })

});
//----------------登录接口
/**
 * 登录接口
 * 请求方式：post
 * 接口地址：api/login
 * 请求体： username | password
 */
router.post('/login', (req, res) => {
  //接收数据
  let { username, password } = req.body;
  password = md5(password);
  // 判断
  db(`select * from user where username='${username}' and password='${password}'`, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // 登陆成功bearer是选取什么格式
      let token = 'Bearer ' + jwt.sign({ id: result[0].id }, 'tang123456', { expiresIn: '2h' });
      res.send({ status: 0, message: "登陆成功", token });
    }
    else {
      res.send({ status: 1, message: '账号或密码错误' });
    }
  })
});

module.exports = router;