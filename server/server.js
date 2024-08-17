const express = require('express');
const cors = require('cors');

const app = express();

const http = require('http'); // 使用 http 服务器
const httpServer = http.createServer(app); // 使用 http 服务器
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// 导入并使用路由模块
const configRouter = require('./routes/config/getConfigs.js');
const userRouter = require('./routes/user/user.js');
const productRouter = require('./routes/product/product.js');
const imageRouter = require('./routes/image/image.js');
app.use('/', configRouter);
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', imageRouter);

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
