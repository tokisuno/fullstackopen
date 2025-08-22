require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }
]

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

const firstBlog = new Blog({
  title: "Joshman",
  author: "Joshua Man",
  url: "https://twitch.tv/joshman",
  likes: 123,
  user:
})

initialBlogs.forEach((blog) => {
  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  })

  newBlog
    .save()
    .then((result) => {
      console.log('Blog saved!')
    })
})

firstBlog.save().then((result) => {
  console.log('blog saved!')
})

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog)
  })
  mongoose.connection.close()
})

