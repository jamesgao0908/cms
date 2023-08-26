const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http'); // 使用 http 服务器
const httpServer = http.createServer(app); // 使用 http 服务器

app.use(express.json());
app.use(cors());

// 导入并使用路由模块
const configRouter = require('./routes/config/getConfigs.js');
const userRouter = require('./routes/user/user.js');
const productRouter = require('./routes/product/product.js');
app.use('/', configRouter);
app.use('/', userRouter);
app.use('/', productRouter);

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
