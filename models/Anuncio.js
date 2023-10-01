const mongoose = require('mongoose');

const keepopSchema = mongoose.Schema({
  item: { type: String, maxlenght: 20, index: true, required: true},
  adType: { type: String, enum: ['sale', 'search'], default: 'sale' },
  price: { type: Number, index: true, min: 0, max: 1000000, required: true },
  img: { type: String, default: 'Picture not defined' },
  tag: { type: String, index: true, enum: ['work', 'lifestyle', 'motor', 'mobile']}
})

