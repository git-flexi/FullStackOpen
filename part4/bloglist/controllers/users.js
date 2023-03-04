// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Please provide a password with at least 3 characters!' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({}).populate('blogs');
  return response.json(blogs);
});

module.exports = usersRouter;
