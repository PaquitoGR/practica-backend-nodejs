const express = require('express');
const Ad = require('../../models/Ad');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const ads = await Ad.find();
    res.json({ results: ads });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
