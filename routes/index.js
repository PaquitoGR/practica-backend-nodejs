const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const ads = await Ad.list();
  res.locals.ads = ads;
  res.render('index', { title: 'KeePoP' });
});

module.exports = router;
