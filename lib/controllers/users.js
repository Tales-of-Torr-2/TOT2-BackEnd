const { Router } = require('express');
const User = require('../models/User.js');

const usersController = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await User.insert(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.getById(id);
      res.send(user || {});
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const users = await User.getAll();

      res.send(users);
    } catch (error) {
      next(error);
    }
  })

  // This route should be protected (i.e. requires authentication)
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
      
      const updatedUser = await User.updateById(id, {
        score,
        heroStats,
        heldGear,
        items,
        achievements,
        location
      });

      res.send(updatedUser || {});
    } catch (error) {
      next(error);
    }
  }
  )

  // This route should be protected (i.e. requires authentication)
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await User.deleteById(id);

      res.send({ message: 'This user has retired.' });
    } catch (error) {
      next(error);
    }
  });

module.exports = usersController; 
