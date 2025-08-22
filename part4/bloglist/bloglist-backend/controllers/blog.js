const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs);
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response(401).json({
      error: 'Token invalid'
    })
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({
      error: 'userId is missing or not valid'
    })
  }

  if (!body.title) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (!body.author) {
    return response.status(400).json({ error: 'author missing' })
  }
  if (!body.url) {
    return response.status(400).json({ error: 'url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes, user } = request.body;

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end;
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;
  blog.user = (new mongoose.Types.ObjectId(user));

  const updatedBlog = await blog.save();
  console.log(response.json(updatedBlog));
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter;
