const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
})

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!body.title) {
    return res.status(400).json({ error: 'title missing' })
  }
  if (!body.author) {
    return res.status(400).json({ error: 'author missing' })
  }
  if (!body.url) {
    return res.status(400).json({ error: 'url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end();
})

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).end;
  }
  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  res.status(201).json(updatedBlog)
})

module.exports = blogsRouter
