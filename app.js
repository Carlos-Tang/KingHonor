const express = require('express');

// 创建express实例
const app = express();

// 监听端口
app.listen(3006, () => {
  console.log('express服务器启动了')
});

//配置接受查询字符串格式请求体,并赋值给req.body
app.use(express.urlencoded({ extended: true }));

// 加载自定义的路由模块，注册中间件
//登录注册模块
let loginRouter = require('./routers/login');
app.use('/api', loginRouter);

// user路由
let userRouter = require('./routers/user');
app.use('/my/user', userRouter);
