const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach(blog => {
    sum += blog.likes
  })

  return sum
}

const favouriteBlog = (blogs) => {
  let favourite = blogs[0];

  blogs.forEach(blog => {
    if (blog.likes >= favourite.likes) {
      favourite = blog
    }
  })

  return favourite
}

// this code might be a war crime
// i really just didn't want to use lodash
// the assignment said that i could use vanilla js soooo.....
const mostBlogs = (blogs) => {
  let list = []

  const add = (arr, author) => {
    const found = arr.some(entry => entry.author === author)
    if (!found) {
      arr.push({ author: author, blogs: 1 })
    } else {
      arr[arr.findIndex(item => item.author === author)].blogs += 1
      return arr
    }
  }

  blogs.forEach(blog => {
    add(list, blog.author)
    // list.push(blog.author)
  })

  let largest = list[0]

  list.forEach(curr => {
    if (curr.blogs >= largest.blogs) {
      largest = curr
    }
  })

  return largest
}

// I don't even think I will fully implement this but this is about to get ugly...
const _mostLikes = (blogs) => {}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}
