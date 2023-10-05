const express = require('express');
const Ad = require('../../models/Ad');
const router = express.Router();

// GET /apiv1/ads search all
router.get('/', async (req, res, next) => {
  try {
    const ads = await Ad.find();
    res.json({ results: ads });
  } catch (err) {
    next(err);
  }
});

// GET /apiv1/ads/(_id) search by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const ad = await Ad.findById(id);
    res.json({ results: ad });
  } catch (err) {
    next(err);
  }
});

// PUT /apiv1/ads/(_id) Update ad
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const ad = await Ad.findById(id);
    if (ad.sale) {
      const data = req.body;
      const updateAd = await Ad.findByIdAndUpdate(id, data, { new: true }); // new true: returns updated ad
      res.json({ results: updateAd });
    }
  } catch (err) {
    next(err);
  }
});

// POST /apiv1/ads create ad
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

// DELETE /apiv1/ads(_id) delete an ad
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Ad.deleteOne({ _id: id });

    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
