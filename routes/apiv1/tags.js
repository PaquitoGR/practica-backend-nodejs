const express = require('express');
const router = express.Router();
const adController = require('../../controllers/adController');

// GET /apiv1/tags Show possible tags
router.get('/', adController.getTags);

module.exports = router;
