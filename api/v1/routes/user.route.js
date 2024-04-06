const UserController = require('../controllers/user.controller');
const Router = require('express').Router();

Router.get('/', UserController.listUser);

module.exports = Router;