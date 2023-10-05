const express = require('express');
const router = express.Router();
const path = require('path');

// GET /api/images access to a single image file
router.get('/:img', (req, res, next) => {
  try {
    const img = req.params.img;
    const imgPath = path.join(__dirname, '../../public/images/ads', img);
    res.sendFile(imgPath);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
