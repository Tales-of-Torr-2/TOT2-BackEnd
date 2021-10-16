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

  .get('/:googleId', async (req, res, next) => {
    try {
      const { googleId } = req.params;
      const user = await userModel.getById(googleId);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const users = await userModel.getAll();

      res.send(users);
    } catch (error) {
      next(error);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        score,
        heroStats,
        heldGear,
        items,
        achievements,
        location
      } = req.body;
      
      const updatedUser = await userModel.updateById(id, {
        score,
        heroStats,
        heldGear,
        items,
        achievements,
        location
      });

      res.send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
  )

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await userModel.deleteById(id);

      res.send({ message: 'This user has retired.' });
    } catch (error) {
      next(error);
    }
  });

module.exports = usersController; 
