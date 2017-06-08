var express = require('express');

var authRouter = express.Router();
var controller = require('./controller');

authRouter.post('/login', controller.Login_user);
authRouter.post('/register', controller.Register_user);

module.exports = authRouter;