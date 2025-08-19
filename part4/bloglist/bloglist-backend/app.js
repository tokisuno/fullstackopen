const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const config = require('./utils/config');
const logger = require('./utils/logger');

const blogsRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login')

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  })

app.use(express.json());
app.use(morgan(":method :url"));

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
