/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();
  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('First class tests');
}, 100000);

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
}, 100000);

test('post is working', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const title = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(title).toContain('Canonical string reduction');
}, 100000);

test('field like is created default 0', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const savedBlog = response.body.find((blog) => blog.title === newBlog.title);

  expect(savedBlog.likes).toBe(0);
}, 100000);

test('field title is required', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 1,
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('field url is required', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 1,
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('delete is working', async () => {
  const blogsBeforeDeletion = await api.get('/api/blogs');

  await api.delete(`/api/blogs/${blogsBeforeDeletion.body[0].id}`)
    .expect(204);

  const blogsAfterDeletion = await api.get('/api/blogs');

  expect(blogsAfterDeletion.body.length).toBe(blogsBeforeDeletion.body.length - 1);
}, 100000);

test('put is working', async () => {
  const blogsBeforePut = await api.get('/api/blogs');

  const changedBlog = await api.put(`/api/blogs/${blogsBeforePut.body[0].id}`)
    .send({ likes: 5 })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAfterPut = await api.get('/api/blogs');

  expect(blogsBeforePut.body[0].likes).not.toBe(blogsAfterPut.body[0].likes);
  expect(changedBlog.body.likes).toBe(5);
  expect(changedBlog.body.likes).toBe(blogsAfterPut.body[0].likes);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
