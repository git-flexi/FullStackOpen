const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  return response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const { body } = request;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user');

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request;

  const blogToUpdate = await Blog.findById(request.params.id);
  blogToUpdate.comments = blogToUpdate.comments.concat(body.comment);
  console.log(blogToUpdate);

  const updatedBlog = await blogToUpdate.save();
  await updatedBlog.populate('user');

  return response.status(201).json(updatedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blogToUpdate = await Blog.findById(request.params.id);
  blogToUpdate.likes = request.body.likes;

  const responseBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true });
  await responseBlog.populate('user');
  return response.json(responseBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'user has no rights to delete this blog' });
  }

  await blog.delete();
  return response.status(204).end();
});

module.exports = blogsRouter;
