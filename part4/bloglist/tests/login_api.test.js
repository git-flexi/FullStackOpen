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

describe('Login', () => {
  test.only('login is correct', async () => {
    await api.post('/api/login/')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test.only('login password incorrect', async () => {
    await api.post('/api/login/')
      .send({ username: 'root', password: 'sekr' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test.only('login username incorrect', async () => {
    await api.post('/api/login/')
      .send({ username: 'roota', password: 'sekret' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test.only('login no username', async () => {
    await api.post('/api/login/')
      .send({ password: 'sekret' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test.only('login no password', async () => {
    await api.post('/api/login/')
      .send({ password: 'sekret' })
      .expect(401)
      .expect('Content-Type', /application\/json/);
  }, 100000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
