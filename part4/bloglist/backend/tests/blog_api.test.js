const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialNotes);
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs');
  console.log(response.body.length);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

after(async () => {
  await mongoose.connection.close();
})
