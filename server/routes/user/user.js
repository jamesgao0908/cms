const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

router.post('/api/user/login', (req, res) => {
  const { email, password, rememberMe } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(401).json({ message: 'Email or password incorrect' });
      } else {
        const user = results[0];
        bcrypt.compare(password, user.password_hash, (err, result) => {
          if (err) {
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
              { expiresIn: rememberMe ? '2w': '1d' } // 设置 token 过期时间
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

router.post('/api/user/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

router.get('/api/user/profile', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // 验证并解析 JWT 令牌
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {

      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    // 在解码后的数据中，你可以访问用户信息，如 decoded.id、decoded.username 等
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

router.post("/api/user/register", (req,res)=>{
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

// 在这里执行查询数据库的操作，获取所有用户的信息
router.get('/api/user/getall', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;