# KeePoP
### Buy-sell network API application

Node.js + Express API and MongoDB database for a web application specialized in classified ads for buying and selling items.

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
GET /apiv1/ads
```
Displays a table with all the records from the database in an HTML view and the same information in JSON format in the console.

#### Get a item by _id

```http
GET apiv1/ads/_id
```
Displays a view of the item with provided ID.

#### Get a Image from the images folder

```http
GET apiv1/images/(fileName)
```
Displays the file image if it exists in the server images folder.

#### Show possible Tags

```http
GET apiv1/tags
```
Displays all the possible tags of the model "tags" field.

#### Update an ad
```http
PATCH apiv1/ads/_id
```
Adding the updated fields to the PUT request.
Returns the updated ad in an HTML view, and the same information in JSON format in the console.

#### Delete an ad
```http
DELETE apiv1/ads/_id
```
Deletes the item with the provided ID from de database.

#### Create an ad
```http
POST apiv1/ads
```
Adding name, price, ad type and tags for the new item in the POST request.
Returns the new ad in JSON format.
