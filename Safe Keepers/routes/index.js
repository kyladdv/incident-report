var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'home' });
});

router.get('/content', function(req, res, next) {
  res.render('index', { title: 'Incident Report' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About' });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});
router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Login' });
});
router.get('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Contact' });
});

module.exports = router;
