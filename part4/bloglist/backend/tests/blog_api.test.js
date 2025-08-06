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

describe('when there are blogs saved to the database', () => {
  describe('when testing the database', () => {
    test('blogs are returned as json', async () => {
      const response = await api.get('/api/blogs');
      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    })

    test('blogs stored on mongodb have attribute of `id`', async () => {
      const response = await api.get('/api/blogs');
      assert.strictEqual(response.body[0].id, helper.initialBlogs[0]._id);
    })
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
  describe('deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      const contents = blogsAtEnd.map(blog => blog.title);
      assert(!contents.includes(blogToDelete.title));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    })
  })
  describe('the updating of a post', () => {
    test('succeeds with status 204 when updating title', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      blogToUpdate.title = "This is a different title now!";

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(201);

      const blogsAtEnd = await helper.blogsInDb();

      const titles = blogsAtEnd.map(blog => blog.title);
      assert(titles.includes(blogToUpdate.title))
    })

    test('succeeds with status 204 when updating author', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      blogToUpdate.author = "Mark Hamill";

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(201);

      const blogsAtEnd = await helper.blogsInDb();
      assert(helper.initialBlogs[0].author !== blogsAtEnd[0].author);
    })

    test('succeeds with status 204 when updating likes', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      blogToUpdate.likes += 1;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(201);
    })
  })
})




after(async () => {
  await mongoose.connection.close();
})
