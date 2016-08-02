"use strict";
const express = require('express');
const mongodb = require('mongodb');
const passport = require('passport')  
const bodyParser = require('body-parser')
const _ = require('lodash');
const generateRandomString = require('./utils/generateRandomString');
// This will configure Passport to use Auth0
const strategy = require('./setup-passport');
// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');


const MongoClient = mongodb.MongoClient;
const mongolabUri = process.env.MONGODB_URI;
let db;
const app = express();

passport.serializeUser(function(user, done) {
  console.log("serialising user");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  console.log("deserialising user");
  done(null, user);
});

passport.use(strategy);
app.use(bodyParser.json({ extended: true }))

app.use(cookieParser());
app.use(session({ secret: process.env.AUTH0_CLIENT_SECRET, resave: false,  saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const port = process.env.PORT || 5000; // let Heroku set the port


app.get('/', (request, response) => {
  response.json({hello: "world"});
})

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(request, response) {
    console.log("authenticating");
    if (!request.user) {
      throw new Error('user null');
    }
    //response.redirect("/user");
    response.json({status: "success"});
  });

app.get('/api/user', function (request, response) {
  response.render('user', {
    user: request.user
  });
});


app.post('/api/user/create', (request, response) => {
  // register a new user
})

app.get('/api/user/:user/polls', (request, response) => {
  const user = request.params.user;
  console.log(user);

  db.collection('polls').find({user}, {_id: 0}).toArray((error, result) => {
    if (error) {
      response.json({status: 'error', message: "failed to get polls from the database"})
    } else if (result) {
      response.json(result);
    }
  })
  
})


app.post('/api/poll/create', (request, response) => {
  const poll = request.body.poll;

  const id = generateRandomString();
  const user = poll.user;
  const question = poll.question;
  const description = poll.description;
  const choices = poll.choices.reduce((choices, choice) => {
    choices[choice] = 0;
    return choices;
  }, {})

  const dbEntry = { question, choices, description, id, user };

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
      response.json(_.keyBy(result, 'id'));
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

app.get('/api/poll/:id/delete', (request, response) => {
  const id = request.params.id;

  db.collection('polls').remove({id}, (error, result) => {
    if (error) {
      response.json({status: "error", message: "failed to delete the poll"});
    } else if (result) {
      response.json({status: "success", message: null});
    }
  })
})

app.post('/api/poll/:id/vote', (request, response) => {
  // add vote to the option
  // or create new option if it does not exist

  const id = request.params.id;
  const choice = request.body.choice;
  const choiceKey = 'choices.' + choice;
  let choicesObj = {};
  choicesObj[choiceKey] = 1;

  db.collection('polls').update({id}, {$inc: choicesObj}, (error, result) => {
    if (error) {
      response.json({status: 'error', message: "failed to vote"});
    } else if (result) {
      response.json({status: 'success', message: null});
    }
  })
})

app.get('/user', function (req, res) {
  res.render('user', {
    user: req.user
  });
});


MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
