const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blog) => {
    res.json(blog);
  })
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error));
})

blogsRouter.post('/', (req, res, next) => {
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

  blog.save()
    .then((savedBlog) => {
      res.json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch(error => next(error))
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
