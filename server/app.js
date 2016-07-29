"use strict";
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser')
const generateRandomString = require('./utils/generateRandomString');


const MongoClient = mongodb.MongoClient;
const mongolabUri = process.env.MONGODB_URI;
let db;
const app = express();

app.use(bodyParser.json({ extended: true }))


const port = process.env.PORT || 5000; // let Heroku set the port

app.get('/', (request, response) => {



  response.json({hello: "world"});
})

app.post('/api/user/create', (request, response) => {
  // register a new user
})

app.post('/api/poll/create', (request, response) => {
  const poll = request.body.poll;

  const id = generateRandomString();
  const question = poll.question;
  const description = poll.description;
  const choices = poll.choices.reduce((choices, choice) => {
    choices[choice] = 0;
    return choices;
  }, {})

  const dbEntry = { question, choices, description, id };

  db.collection('polls').save(dbEntry, (error, result) => {
    if (error) {
      response.json({status: 'error', message: "boooo"})
    } else if (result) {
      response.json({status: 'success', message: null})
    }
  })
})

app.get('/api/polls/view', (request, response) => {
  db.collection('polls').find(null, {_id: 0}).toArray((error, result) => {
    if (error) {
      response.json({status: 'error', message: "failed to get polls from the database"})
    } else if (result) {
      response.json(result);
    }
  })
})

app.get('/api/poll/:id/view', (request, response) => {
  const id = request.params.id
  
  db.collection('polls').find({id}, {_id: 0}).toArray((error, result) => {
    if (error) {
      response.json({status: 'error', message: "failed to get polls from the database"})
    } else if (result) {
      response.json(result);
    }
  })
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
