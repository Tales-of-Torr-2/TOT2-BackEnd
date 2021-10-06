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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userModel.getById(id);
      res.send(user); 
    } catch (error) {
      next(error);
    }
  });

module.exports = usersController; 
