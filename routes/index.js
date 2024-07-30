const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.get('/', userController.getPosts);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/post', userController.createPost);

module.exports = router;