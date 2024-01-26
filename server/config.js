
const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: 8080,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    dbName: process.env.DB_DATABASE || 'CMS',
  }
};