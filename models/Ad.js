const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  name: { type: String, maxlenght: 20, index: true, required: true },
  sale: { type: Boolean, default: true },
  price: { type: Number, index: true, min: 0, max: 1000000, required: true },
  img: { type: String, default: 'Picture not defined' },
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] }
}, {
  collection: 'ads'
});

adSchema.statics.list = function (filtro, skip, limit, sort, fields) {
  const query = Ad.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
