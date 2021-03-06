"use strict";
const express = require('express');
const mongodb = require('mongodb');
const passport = require('passport')  
const bodyParser = require('body-parser')
const _ = require('lodash');
const generateRandomString = require('./utils/generateRandomString');
const strategy = require('./setup-passport');
// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');

const MongoClient = mongodb.MongoClient;
const mongolabUri = process.env.MONGODB_URI;
let db;
const app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(strategy);

app.use(bodyParser.json({ extended: true }))
app.use(cookieParser());
app.use(session({ secret: process.env.AUTH0_CLIENT_SECRET, resave: false,  saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 5000; // let Heroku set the port

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(request, response) {
    console.log("authenticating");
    if (!request.user) {
      throw new Error('user null');
    }
    response.redirect("https://voting-app-4iar.herokuapp.com");
  });

app.get('/api/auth/currentuser', (request, response) => {
  const user = request.user;
  if (!user) {
    response.json({
      status: "error",
      message: "not logged in"
    });
  } else {
    response.json({
      status: "success",
      message: null,
      id: user.id,
      user: user.displayName
    });
  }
});

app.get('/api/user/:userId/polls', (request, response) => {
  const userId = request.params.userId;

  db.collection('polls').find({userId}, {_id: 0}).toArray((error, result) => {
    if (error) {
      response.json({status: 'error', message: "failed to get polls from the database"})
    } else if (result) {
      response.json(result);
    }
  })
})


app.post('/api/poll/create', (request, response) => {
  if (!request.isAuthenticated()) {
    response.json({status: 'error', message: 'not logged in'});
  }

  const poll = request.body.poll;
  const u = request.user;

  const id = generateRandomString();
  const user = u.displayName;
  const userId = u.id;
  const question = poll.question;
  const description = poll.description;
  const voteHistory = {};
  const choices = poll.choices.reduce((choices, choice) => {
    // prevent questions from being empty strings
    if (choice) {
      choices[choice] = 0;
    }
    return choices;
  }, {})

  if (_.isEmpty(choices)) {
    response.json({status: 'error', message: 'there were no valid choices'});
    return;
  }

  const dbEntry = { question, choices, description, id, user, userId, voteHistory };

  db.collection('polls').save(dbEntry, (error, result) => {
    if (error) {
      response.json({status: 'error', message: "boooo"})
    } else if (result) {
      response.json({status: 'success', message: null, id})
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
  if (!request.isAuthenticated()) {
    response.json({status: 'error', message: 'not logged in'});
  }

  const id = request.params.id;
  const userId = request.user.id;

  db.collection('polls').findOne({id}, (error, result) => {
    if (error) {
      response.json({status: "error", message: "failed to delete the poll"});
    } else if (result) {
      if (result.userId === userId) {
        db.collection('polls').remove({id}, (error, result) => {
          if (error) {
            response.json({status: "error", message: "failed to delete the poll"});
          } else if (result) {
            response.json({status: "success", message: null});
          }
        })
      } else {
        response.json({status: "error", message: "you cannot delete a poll that wasn't created by you!"})
      }
    }
  })
})

app.post('/api/poll/:id/vote', (request, response) => {
  const userId = request.user ? request.user.id : null;
  const id = request.params.id;
  const choice = request.body.choice;
  const choiceKey = 'choices.' + choice;
  let choicesObj = {};
  choicesObj[choiceKey] = 1;

  db.collection('polls').findOne({id}, (error, result) => {
    // TODO: find a less silly way to do this and improve error handling
    let voteHistory = result.voteHistory ? result.voteHistory : {};
    if (userId) {
      if (voteHistory[userId] !== undefined) {
        response.json({status: 'error', message: "user has voted once already"});
      } else {
        voteHistory[userId] = choice;
      }
    }
    db.collection('polls').update({id}, {$inc: choicesObj, $set: {voteHistory: voteHistory}}, (error, result) => {
      if (error) {
        response.json({status: 'error', message: "failed to vote"});
      } else if (result) {
        response.json({status: 'success', message: null});
      }
    })
  })
})

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
