var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');
let jwt = require('jsonwebtoken');

router.get('/', indexController.Home);
router.get('/home', indexController.Home);
router.get('/content', indexController.Content);
router.get('/about', indexController.About);
router.get('/contact', indexController.Contact);
router.get('/login', indexController.Login);
router.post('/login', indexController.processLoginPage);
router.get('/register', indexController.Register);
router.post('/register', indexController.processRegisterPage);
module.exports = router;