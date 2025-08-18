const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author} (<a href={blog.url}>LINK</a>)
  </div>
)

export default Blog
