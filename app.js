"use strict";
const express = require('express');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongolabUri = process.env.MONGODB_URI;
let db;
const app = express();

const port = process.env.PORT || 5000; // let Heroku set the port

app.get('/', (request, response) => {
  response.json({hello: "world"});
})

MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
