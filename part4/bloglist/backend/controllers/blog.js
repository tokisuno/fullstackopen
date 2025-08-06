const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  Blog.find({}).then((blog) => {
    res.json(blog);
  })
})

// change tmux binds for changing sessions

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

blogsRouter.put('/:id', (req, res, next) => {
  const { title, author, url, likes } = req.body;

  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).end()
      }
      blog.title = title
      blog.author = author
      blog.url = url
      blog.likes = likes

      return blog.save().then((updatedBlog) => {
        res.json(updatedBlog)
      })
    })
    .catch(error => next(error))

})

module.exports = blogsRouter
