const Ad = require('../models/Ad');

exports.getAds = async (req, res, next) => {
  try {
    // filter by name
    // http://127.0.0.1:3000/apiv1/ads?name=book
    const filterByName = req.query.name;

    // filter by ad type: true = sale, false = search
    // http://127.0.0.1:3000/apiv1/ads?sale=true
    const filterByAdType = req.query.sale;
    // filter by tags
    // http://127.0.0.1:3000/apiv1/ads?tags=lifestyle
    const filterByTags = req.query.tags;
    // filter by price
    const filterByPrice = req.query.price;
    // pagination
    // http://127.0.0.1:3000/apiv1/ads?skip=2&limit=3
    const start = req.query.start;
    const limit = req.query.limit;
    // sort
    // http://127.0.0.1:3000/apiv1/ads?sort=-name (- for descent)
    const sort = req.query.sort;
    // fields
    // http://127.0.0.1:3000/apiv1/ads?fields=name -_id (- for descent)
    const fields = req.query.fields;

    const filter = {};

    if (filterByName) {
      filter.name = new RegExp('^' + req.query.name, 'i');
    };

    if (filterByAdType) {
      filter.sale = filterByAdType;
    };

    if (filterByTags) {
      filter.tags = filterByTags;
    }

    if (filterByPrice) {
      // Case price contains '-' (only one ocurrence)
      if (filterByPrice.indexOf('-') !== -1 && filterByPrice.split('-').length <= 2) {
        if (filterByPrice[0] === '-') {
          // Case '-' is the first character, price < param
          const priceLt = filterByPrice.slice(1);
          filter.price = { $lte: priceLt };
        } else if (filterByPrice[filterByPrice.length - 1] === '-') {
          // Case '-' is the last character, price > param
          const priceGt = filterByPrice.slice(0, -1);
          filter.price = { $gte: priceGt };
        } else {
          // Case '-' is between two numbers
          const priceGt = filterByPrice.slice(0, filterByPrice.indexOf('-'));
          const priceLt = filterByPrice.slice(filterByPrice.indexOf('-') + 1);
          // If the first number is greater, order is reversed:
          filter.price = (priceLt > priceGt) ? { $gte: priceGt, $lte: priceLt } : { $gte: priceLt, $lte: priceGt };
        }
      } else {
        filter.price = filterByPrice;
      }
    }

    const ads = await Ad.list(filter, start, limit, sort, fields);
    console.log({ ads });
    res.render('result', { ads });
  } catch (err) {
    next(err);
  }
};

exports.getAdById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ad = await Ad.findById(id);
    res.render('resultSingle', { ad });
    console.log({ ad });
  } catch (err) {
    next(err);
  }
};

exports.updateAd = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const ad = await Ad.findById(id);
    const data = req.body;
    const updateAd = await Ad.findByIdAndUpdate(id, data, { new: true }); // new true: returns updated ad
    res.json({ results: updateAd });
  } catch (err) {
    next(err);
  }
};

exports.createAd = async (req, res, next) => {
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
};

exports.deleteAd = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Ad.deleteOne({ _id: id });

    res.json({ msg: 'item succesfully deleted' });
  } catch (err) {
    next(err);
  }
};

exports.getTags = (req, res, next) => {
  try {
    const enumTags = Ad.schema.path('tags').caster.enumValues;
    res.render('showTags', { enumTags });
    console.log(enumTags);
  } catch (err) {
    next(err);
  }
};
