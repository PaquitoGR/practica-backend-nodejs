const express = require('express');
const Ad = require('../../models/Ad');
const router = express.Router();

// GET /api/ads search all
router.get('/', async (req, res, next) => {
  try {
    // filter by name
    // http://127.0.0.1:3000/api/ads?name=book
    const filterByName = req.query.name;
    // filter by ad type: true = sale, false = search
    // http://127.0.0.1:3000/api/ads?sale=true
    const filterByAdType = req.query.sale;
    // filter by tags
    // http://127.0.0.1:3000/api/ads?tags=lifestyle
    const filterByTags = req.query.tags;
    // filter by price
    const filterByPrice = req.query.price;
    // pagination
    // http://127.0.0.1:3000/api/ads?skip=2&limit=3
    const skip = req.query.skip;
    const limit = req.query.limit;
    // sort
    // http://127.0.0.1:3000/api/ads?sort=-name (- for descent)
    const sort = req.query.sort;
    // fields
    // http://127.0.0.1:3000/api/ads?fields=name -_id (- for descent)
    const fields = req.query.fields;

    const filter = {};

    if (filterByName) {
      filter.name = filterByName;
    };

    if (filterByAdType) {
      filter.sale = filterByAdType;
    };

    if (filterByTags) {
      filter.tags = filterByTags;
    }

    if (filterByPrice) {
      filter.price = filterByPrice;
    }

    const ads = await Ad.list(filter, skip, limit, sort, fields);
    res.json({ results: ads });
  } catch (err) {
    next(err);
  }
});

// GET /api/ads/(_id) search by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const ad = await Ad.findById(id);
    res.json({ results: ad });
  } catch (err) {
    next(err);
  }
});

// PUT /api/ads/(_id) Update ad
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    // const ad = await Ad.findById(id);
    const data = req.body;
    const updateAd = await Ad.findByIdAndUpdate(id, data, { new: true }); // new true: returns updated ad
    res.json({ results: updateAd });
  } catch (err) {
    next(err);
  }
});

// POST /api/ads create ad
router.post('/', async (req, res, next) => {
  try {
    const adData = req.body;
    // create ad instance in memory
    const ad = new Ad(adData);
    // save in DB
    const savedAd = await ad.save();

    res.json({ result: savedAd });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/ads(_id) delete an ad
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Ad.deleteOne({ _id: id });

    res.json({ msg: 'item succesfully deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
