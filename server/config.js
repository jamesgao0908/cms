
const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: 8080,
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASEx
  }
};

