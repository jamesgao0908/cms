const express = require('express');
const router = express.Router();
const path = require('path');
const sharp = require('sharp');
const fs = require('fs'); // 引入fs模块

const baseImagePath = path.join(__dirname, '../../data/images/product');

router.use('/data/images/cake', express.static(path.join(__dirname, '../../data/images/product')));

router.get('/api/product/:productId/image/:imageId', (req, res) => {
  const productId = req.params.productId;
  const imageId = req.params.imageId;

  const originalImagePath = path.join(baseImagePath, productId, `${imageId}.jpg`);

  res.sendFile(originalImagePath);
});

router.get('/api/product/:productId/image', (req, res) => {
  const productId = req.params.productId;

  const imageFolder = path.join(baseImagePath, productId);

  if (!fs.existsSync(imageFolder)) {
    return res.status(404).send('未找到图片文件夹');
  }

  fs.readdir(imageFolder, (err, files) => {
    if (err) {
      console.error('读取图片文件夹出错:', err);
      return res.status(500).send('读取图片文件夹出错');
    }

    const imageFiles = files.filter(file => {
      const fileExtension = path.extname(file).toLowerCase();
      return ['.jpg', '.png', '.jpeg', '.gif', '.bmp'].includes(fileExtension); // 如有其他图片文件格式，请添加
    });

    const imagePaths = imageFiles.map(file => path.join('/api', 'product', productId, 'image', path.parse(file).name));
    res.json({ images: imagePaths });
  });
});


router.get('/api/product/:productId/thumbnail/:imageId', (req, res) => {
  const productId = req.params.productId;
  const imageId = req.params.imageId;

  const thumbnailFolder = path.join(baseImagePath, productId, 'thumbnails');
  if (!fs.existsSync(thumbnailFolder)) {
    fs.mkdirSync(thumbnailFolder, { recursive: true });
  }

  const thumbnailImagePath = path.join(thumbnailFolder, `${imageId}.jpg`);
  const originalImagePath = path.join(baseImagePath, productId, `${imageId}.jpg`);

  if (!fs.existsSync(thumbnailImagePath)) {
    sharp(originalImagePath)
      .resize({ width: 200, height: 200 })
      .toFile(thumbnailImagePath, (err, info) => {
        if (err) {
          console.error('Error generating thumbnail:', err);
          return res.status(500).send('Error generating thumbnail');
        }

        res.sendFile(thumbnailImagePath);
      });
  } else {
    res.sendFile(thumbnailImagePath);
  }
});


module.exports = router;
