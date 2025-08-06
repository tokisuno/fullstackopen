require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// const config = require('./utils/config')
// const url = config.MONGODB_URI

const url = process.env.MONGODB_URI_TEST;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`)
  })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: "Joshman",
  author: "Joshua Man",
  url: "https://twitch.tv/joshman",
  likes: 123
})

blog.save().then((result) => {
  console.log('blog saved!')
  // mongoose.connection.close()
})

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog)
  })
  mongoose.connection.close()
})

