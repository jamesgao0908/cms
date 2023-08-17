
import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: 8080,
  database: {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASSWORD || 'password',
    dbName: process.env.DB_DATABASE || 'mydb'
  }
};

export default config;
