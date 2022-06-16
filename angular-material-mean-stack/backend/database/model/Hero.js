const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Hero = new Schema({
  hero_name: {
    type: String
  },
  hero_alias: {
    type: String
  },
  hero_group: {
    type: String
  },
  hero_romantic_interest: {
    type: Array
  },
  hero_attribute: {
    type: String
  },
  last_edited: {
    type: Date
  }
}, {
  collection: 'SuperheroesWikia2'
})
module.exports = mongoose.model('Hero', Hero)