
import express from "express";
import mysql from 'mysql';
import cros from 'cors';
import config from './config.js';
import fs from 'fs';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import https from 'https';



dotenv.config();

//使用https 加密证书
const privateKey = fs.readFileSync('./key.pem', 'utf8');
const certificate = fs.readFileSync('./cert.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

const app = express()
const httpsServer = https.createServer(credentials, app);

// const app = express()
app.use(express.json())
app.use(cros())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE ,
})

app.get("/allproducts",(req,res)=>{
  const q = "SELECT * from CMS.products"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/product/:id", (req,res)=>{
  const productId = req.params.id
  const q = `SELECT * from CMS.products where product_id = ${productId}`
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/api/config/header",async (req,res)=>{
  fs.readFile('./config/header.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    } else {
      try {
        const jsonObject = JSON.parse(data);
        res.json(jsonObject);
      } catch (parseError) {
        res.status(500).json({ error: 'Error parsing JSON' });
      }
    }
  });
})

app.post("/api/config/header/update", (req, res) => {
  const newConfig = req.body;
  // config.header.contact = newConfig;
  
  // 将更新后的配置写回到文件中
  fs.writeFile('./config/header.json', JSON.stringify(newConfig, null, 2), 'utf-8', (err) => {
    if (err) {
      // console.error('Error writing config file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Config updated successfully' });
    }
  });
});

//还要修改，如果用户已经注册了->让他找回密码
app.post("/api/register", (req,res)=>{
  const password = req.body.password;
  const saltRounds = 10; // 控制生成哈希时的计算次数，增加哈希的复杂度
  const salt = bcrypt.genSaltSync(saltRounds);// 生成盐
  const passwordHash = bcrypt.hashSync(password, salt);// 生成密码哈希

  const newUser = {
    username: req.body.username,
    password_hash: passwordHash, 
    salt: salt,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    is_admin: req.body.is_admin //默认为0，非admin
  };

  db.query('INSERT INTO users SET ?', newUser, (error) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json("User has created successfully");
    }
  });
})

//用户登陆
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: 'Email or password incorrect' });
      } else {
        const user = results[0];
        bcrypt.compare(password, user.password_hash, (err, result) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ message: 'Internal server error' });
          } else {
            if (result) {
              // 生成 JWT
              const token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                phone: user.phone,
                is_admin: user.is_admin,
              },
              process.env.JWT_SECRET_KEY, // 使用环境变量存储密钥
              { expiresIn: '2w' } // 设置 token 过期时间
              );

              res.json({ message: 'Login successful', token, is_admin: user.is_admin });
            } else {
              res.status(401).json({ message: 'Email or password incorrect' });
            }
          }
        });
      }
    }
  });
});

//登出
app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

//获取用户基本信息
app.get('/api/user/profile', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // 验证并解析 JWT 令牌
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // 在解码后的数据中，你可以访问用户信息，如 decoded.id、decoded.username 等

    // 在这里返回用户信息
    const userProfile = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      is_admin: decoded.is_admin,
      phone: decoded.phone
    };

    res.status(200).json(userProfile);
  });
});



const PORT = 8080; // HTTPS 默认端口
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
