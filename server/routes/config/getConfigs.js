const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/api/config/header', async (req, res) => {
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
});

router.get('/api/config/footer', async (req, res) => {
  fs.readFile('./config/footer.json', 'utf8', (err, data) => {
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
});

module.exports = router;
