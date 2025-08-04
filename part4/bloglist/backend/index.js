const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Serfer running on port ${config.PORT}`)
})

// what to put in here
// - [x] ./utils/config
// - [x] ./utils/logger
// - [ ] ./utils/middleware?
// - [x] ./controllers/blogs

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then(result => {
    res.status(201).json(result);
  })
})

