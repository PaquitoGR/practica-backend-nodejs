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

#### Search items with filters
```http
GET /apiv1/ads?name=boo
```
This will display all the items with name starting by "boo".

You can use some filters in your URL query:
```http
GET /apiv1/ads?price=-1000
```
This will show ads with price less than or equal to 1000. You can also type 100- for prices greater than or equal 100.
```http
GET /apiv1/ads?price=100-500
```
This will display ads with prices between 100 and 500.

You can also add some mongoDB filters as:
- Add *start*=number to skip a specific number of items at the beginning of the query results. Useful for pagination.
- Add *limit*=number to specify the maximum number of ads you want to be returned in the query results.
- Add *sort*=DBfield to order the query results based on a specific field, either in ascending order, or descending order adding the character '-' (-DBfield).
- Add *fields*=DBfield to spicify which fields you want to be returned in the query results. It's useful for selecting specific fields and reducing the amount of data retireved.

These filters can be combined 

#### Get a item by _id

```http
GET apiv1/ads/(_id)
```
Displays a view of the item with provided ID.

#### Get an image from the images folder

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
PATCH apiv1/ads/(_id)
```
Adding the updated fields to the PUT request.
Returns the updated ad in an HTML view, and the same information in JSON format in the console.

#### Delete an ad
```http
DELETE apiv1/ads/(_id)
```
Deletes the item with the provided ID from de database.

#### Create an ad
```http
POST apiv1/ads
```
Adding name, price, ad type and tags for the new item in the POST request.
Returns the new ad in JSON format.
