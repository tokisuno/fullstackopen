const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
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

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId);

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
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end;
  }
  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter;
