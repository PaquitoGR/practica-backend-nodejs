# KeePoP
### Buy-sell network API application

### Install

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

### Start

In production:

```sh
$ npm start
```

In development:

```sh
$ npm run dev
```

### Reset to initial DB
(This will erase all previous data)

```sh
$ node init-db.js
```

### API Endpoints

#### Get all items

```http
GET /api/ads
```

```json
{
    "results": {
        "_id": "651e71c2a32649f28652cf29",
        "name": "book",
        "sale": true,
        "price": 10,
        "img": "./public/images/ads/keepop-book.jpg",
        "tags": [
            "work",
            "lifestyle"
        ],
        "__v": 0
    }
}
```