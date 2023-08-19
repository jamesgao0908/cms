const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http'); // 使用 http 服务器
const httpServer = http.createServer(app); // 使用 http 服务器

app.use(express.json());
app.use(cors());

// 导入并使用路由模块
const headerRouter = require('./routes/config/getHeader.js');
const userRouter = require('./routes/user/user.js');
app.use('/', headerRouter);
app.use('/', userRouter);

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
