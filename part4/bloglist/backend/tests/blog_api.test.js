const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs); // <--- i had this set to helper.initialNotes which would delete my database...
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
})

test('blogs stored on mongodb have attribute of `id`', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body[0].id, helper.initialBlogs[0]._id);
})

test('blogs are returned as json', async () => {
  console.log('entered test');
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

describe('when saving a blog', () => {
  test('successfully creates a blog post', async () => {
    const newPost = {
      title: "Newly added blog",
      author: "Horizon",
      url: "https://myspace.com",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(blog => blog.title);
    assert(contents.includes('Newly added blog'));
  })

  test('defaults likes to 0 if likes is not passed', async () => {
    const newPost = {
      title: "Oh no I forgot likes!",
      author: "Horizon",
      url: "https://myspace.com",
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
  })

  test('without a `title` field, expect status 400', async () => {
    const newPost = {
      author: "Horizon",
      url: "https://myspace.com",
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  })

  test('without a `url` field, expect status 400', async () => {
    const newPost = {
      title: "This is an awesome post!",
      author: "Will Smith"
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close();
})
