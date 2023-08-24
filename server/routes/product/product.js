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
  products.product_id,
  products.product_name,
  products.description,
  products.price,
  products.stock,
  products.category_id,
  IFNULL(GROUP_CONCAT(product_images.image_url), '') AS image_urls
  FROM
    products
  LEFT JOIN
    product_images ON products.product_id = product_images.product_id
  GROUP BY
    products.product_id;

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