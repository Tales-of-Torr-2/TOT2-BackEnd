const { Router } = require('express');
const userModel = require('../models/User.js');

const usersController = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await userModel.insert(req.body); 
      res.send(user); 
    } catch (error) {
      next(error); 
    }
  });

module.exports = usersController; 
