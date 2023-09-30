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
    ) AS image_urls,
    IFNULL((
      SELECT JSON_ARRAYAGG(image_url)
      FROM product_images pi
      WHERE pi.product_id = p.product_id
    ), '[]') AS all_images
  FROM products p;
  `;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;