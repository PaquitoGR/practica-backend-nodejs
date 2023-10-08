# KeePoP - Buy-sell network API application

Node.js + Express API and MongoDB database for a web application specialized in classified ads for buying and selling items.

**Author**: Francisco A. Suárez

## Table of contents

- [Requirements](#requirements)
- [Installation](#Installation)
- [Start](#Start)
- [DB Model](#db-collection-model)
- [API Endpoints](#Endpoints)
- [Examples](#examples)

## Requirements

- Node.js and npm installed.
- MongoDB database.

## Installation

Install dependencies:

```sh
$ npm install
```

### (MaxOS or Linux) Start a MongoDB Server

From the root folder of the server:

```sh
$ ./bin/mongod --dbpath ./data
```

Review database connection on /lib/connectMongoose.js
(by default, ``mongodb://127.0.0.1/keepopDB``)

## Start

In production:

```sh
$ npm start
```

In development:

```sh
$ npm run dev
```

Reset database to its initial state (This will delete existing data).

```sh
$ node init-db.js
```

## DB collection model
collection 'ads':

```js
{
  name: { type: String, maxlenght: 20, index: true, required: true },
  sale: { type: Boolean, default: true },
  price: { type: Number, index: true, min: 0, max: 1000000, required: true },
  img: { type: String, default: 'Picture not defined' },
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] }
}
```
## Endpoints

#### Get all items

```http
GET /apiv1/ads
```
Returns all the records from the database.

#### Get a item by _id

```http
GET /apiv1/ads/(_id)
```
Returns the item with provided ID.

#### Get an image from the images folder

```http
GET /apiv1/images/(fileName)
```
Displays the file image if it exists in the server images folder.

#### Update an ad
```http
PATCH /apiv1/ads/(_id)
```
Updates the item with the provided ID.

#### Delete an ad
```http
DELETE /apiv1/ads/(_id)
```
Deletes the item with the provided ID from de database.

#### Create an ad
```http
POST /apiv1/ads
```
Creates a new ad.
#### Show possible Tags

```http
GET /apiv1/tags
```
Returns an object with a list of all the possible tags.

## Examples
**You can access the data in JSON format via route ``/apiv1/ads``, or in HTML view format via url root ``localhost/``.**
Fields in this collection: 
- name: string
- price: number
- sale: boolean
- tags: array of strings
- img: string (file path)

Search items with filters.

```http
GET /apiv1/ads?name=boo
```
This will return all the items with name starting with "boo".

You can use some filters in your URL query:
```http
GET /apiv1/ads?price=-1000
```
This will return ads with price less than or equal to 1000. You can also type 100- for prices greater than or equal 100.
```http
GET /apiv1/ads?price=100-500
```
This will return ads with prices between 100 and 500.

You can also add some filters as:
- **start**=number to skip a specific number of items at the beginning of the query results. Useful for pagination.
- **limit**=number to specify the maximum number of ads you want to be returned in the query results.
- **sort**=DBfield to order the query results based on a specific field, either in ascending order, or descending order adding the character '-' (-DBfield).
- **fields**=DBfield to spicify which fields you want to be returned in the query results. It's useful for selecting specific fields and reducing the amount of data retireved.

These filters can be combined with the character '&'.

```http
GET /apiv1/ads?name=p&price=200-400&tags=lifestyle&sort=-price&start=4&limit=5
```
This will return all ads with name starting with 'p', price between 200 and 400, that has tag 'lifestyle', ordered by price in descending order, skipping the first 4 items and limiting the view to 5 ads.
