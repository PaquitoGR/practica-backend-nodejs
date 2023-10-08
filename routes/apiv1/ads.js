const express = require('express');
const router = express.Router();
const adController = require('../../controllers/adController');

// GET /apiv1/ads search all ads with filters
router.get('/', adController.getAds);

// GET /apiv1/ads/(_id) search by id
router.get('/:id', adController.getAdById);

// PUT /apiv1/ads/(_id) Update ad
router.put('/:id', adController.updateAd);

// POST /apiv1/ads create ad
router.post('/', adController.createAd);

// DELETE /apiv1/ads/(_id) delete an ad
router.delete('/:id', adController.deleteAd);

module.exports = router;
