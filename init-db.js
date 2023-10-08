'use strict';

const readline = require('node:readline');
const connection = require('./lib/connectMongoose');
const Ad = require('./models/Ad');
const initData = require('./init-db-data.json');

main().catch(err => console.log('Error', err));

function deleteQuestion (text) {
  return new Promise((resolve, reject) => {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(text, answer => {
      ifc.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
};

async function main () {
  await new Promise(resolve => connection.once('open', resolve));

  const del = await deleteQuestion(
    'Are you sure you want to delete the database and load initial data? (y/n)'
  );

  if (!del) {
    console.log('Nothing was modified.');
    process.exit();
  }

  await initAds();
  connection.close();
};

async function initAds () {
  // delete all items in collection Ads
  const deleted = await Ad.deleteMany();
  console.log(`${deleted.deletedCount} ads deleted.`);

  // create initial data
  const inserted = await Ad.insertMany(initData.ads);
  console.log(`${inserted.length} ads created.`);
};
