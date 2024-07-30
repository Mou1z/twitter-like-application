const User = require('../models/user');
const Post = require('../models/post');

exports.register = (req, res) => {
  const { username, password } = req.body;
  User.findUser(username, (err, user) => {
    if (user) {
      return res.status(400).send('User already exists');
    }
    User.createUser(username, password, (err, userId) => {
      if (err) {
        return res.status(500).send('Error creating user');
      }
      res.redirect('/login');
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findUser(username, (err, user) => {
    if (!user || user.password !== password) {
      return res.status(400).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/');
  });
};

exports.createPost = (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  const { content } = req.body;
  Post.createPost(req.session.user.username, content, (err, postId) => {
    if (err) {
      return res.status(500).send('Error creating post');
    }
    res.redirect('/');
  });
};

exports.getPosts = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  Post.getPosts((err, posts) => {
    if (err) {
      return res.status(500).send('Error retrieving posts');
    }
    res.render('home', { user: req.session.user, posts });
  });
};