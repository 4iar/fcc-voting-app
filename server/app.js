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

app.post('/api/user/create', (request, response) => {
  // register a new user
})

app.post('/api/poll/create', (request, response) => {
  // get json new poll stuff
})

app.get('/api/poll/:pollId/view', (request, response) => {
})

app.post('/api/poll/:id/delete', (request, response) => {
})

app.post('/api/poll/:id/vote', (request, response) => {
  // add vote to the option
  // or create new option if it does not exist
})

MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
