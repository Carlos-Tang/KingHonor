// 个人中心入口
const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { md5 } = require('utility');
// 创建路由实例，实际是一个函数
const router = express.Router();
//用户信息接口
router.get('/userinfo', (req, res) => {

});

module.exports = router;