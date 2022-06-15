const express = require('express');
const app = express();
const heroRoute = express.Router();
// Hero model
let Hero = require('../model/Hero');
// Add Hero
heroRoute.route('/add-hero').post((req, res, next) => {
  Hero.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
// Get all hero
heroRoute.route('/').get((req, res) => {
  Hero.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
// Get single hero
heroRoute.route('/read-hero/:id').get((req, res) => {
  Hero.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update hero
heroRoute.route('/update-hero/:id').put((req, res, next) => {
  Hero.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Hero successfully updated!')
    }
  })
})
// Delete Hero
heroRoute.route('/delete-hero/:id').delete((req, res, next) => {
  Hero.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = heroRoute;