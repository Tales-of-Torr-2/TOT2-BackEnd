const express = require('express');
const cors = require('cors');
const usersController = require('../lib/controllers/users.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersController);

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
