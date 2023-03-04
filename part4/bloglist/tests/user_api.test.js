/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('Post of users', () => {
  test('Creation of new user', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    const usernames = response.body.map((r) => r.username);

    expect(usernames).toHaveLength(2);
    expect(usernames).toContain(newUser.username);
  }, 100000);

  test('Post invalid username', async () => {
    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(1);
  }, 100000);

  test('Post short password', async () => {
    const newUser = {
      username: 'Matti',
      name: 'Matti Luukkainen',
      password: 'sa',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(1);
  }, 100000);

  test('Post no password', async () => {
    const newUser = {
      username: 'Matti',
      name: 'Matti Luukkainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');

    expect(response.body).toHaveLength(1);
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
