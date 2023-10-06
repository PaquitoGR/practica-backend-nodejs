const express = require('express');
const router = express.Router();
const adController = require('../../controllers/adController');

// GET /api/ads search all ads with filters
router.get('/', adController.getAllAds);

// GET /api/ads/(_id) search by id
router.get('/:id', adController.getAdById);

// PUT /api/ads/(_id) Update ad
router.put('/:id', adController.updateAd);

// POST /api/ads create ad
router.post('/', adController.createAd);

// DELETE /api/ads(_id) delete an ad
router.delete('/:id', adController.deleteAd);

module.exports = router;
