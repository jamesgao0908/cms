const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// const config = require('../../config');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

router.get('/api/product/getall', (req, res) => {
  const query = `
  SELECT
    p.product_id,
    p.product_name,
    p.description,
    p.price,
    p.stock,
    p.category_id,
    (
      SELECT pi.image_url
      FROM product_images pi
      WHERE pi.product_id = p.product_id
      LIMIT 1
    ) AS image_urls
  FROM products p;
  `;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      results.forEach(element => {
        element.image_urls = `/api/product/${element.product_id}/thumbnail/1`
      });
      res.status(200).json(results);
    }
  });
});

router.get('/api/product/ins', (req, res) => {
  db.query('SELECT * FROM instagram', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      console.error('db info', db);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});


router.get('/api/product/:productId', (req, res) => {
  const productId = req.params.productId;
  const query = `
    SELECT *
    FROM products p
    WHERE p.product_id = ?;`;

  db.query(query, [productId], (error, results) => {
    if (error) {
      res.status(500).json({ message: '服务器内部错误' });
    } else if (results.length === 0) {
      res.status(404).json({ message: '未找到产品' });
    } else {
      results[0].image_urls = "Helloworld";
      res.status(200).json(results);
    }
  });
});


router.get('/api/product', (req, res) => {
  db.query('SELECT * FROM products', (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving products' });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/api/product/add', (req, res) => {
  const { product_name, description, price, stock, category_id, thumbnail } = req.body;

  // Execute SQL query to insert data into the products table
  db.query('INSERT INTO products (product_name, description, price, stock, category_id, thumbnail) VALUES (?, ?, ?, ?, ?, ?)',
    [product_name, description, price, stock, category_id, thumbnail],
    (error, result) => {
      if (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ error: 'Error inserting product', details: error });
      } else {
        console.log('Product inserted successfully');
        res.status(200).json({ message: 'Product inserted successfully' });
      }
    });
});

module.exports = router;