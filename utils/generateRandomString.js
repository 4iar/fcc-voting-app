"use strict";
const _ = require('lodash');

function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  const num = 8;

  let output = [];
  _.times(num, () => {
    output.push(_.sample(characters))
  })
  
  return output.join('');
}

module.exports = generateRandomString;
