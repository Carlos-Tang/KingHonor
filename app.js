const express = require('express');
const db = require('./db');
const { md5 } = require('utility');

// 创建express实例
const app = express();

// 监听端口
app.listen(3006, () => {
  console.log('express服务器启动了')
});

// 配置，写接口
//配置接受查询字符串格式请求体
app.use(express.urlencoded({ extended: true }));

//-------------------注册接口----------
//请求体:username,password
app.post('/api/register', (req, res) => {
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
app.post('/app/login', (req, res) => {

});