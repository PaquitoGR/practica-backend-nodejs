const express = require('express');
const router = express.Router();
const adController = require('../../controllers/adController');

// Show possible tags
router.get('/', adController.getTags);

module.exports = router;
