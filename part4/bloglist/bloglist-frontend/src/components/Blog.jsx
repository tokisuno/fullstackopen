import { useState, useImperativeHandle, forwardRef } from 'react';

const Blog = forwardRef((props, ref) => {
  const [expand, setExpand] = useState(false);

  const hideWhenVisible = { display: expand ? "none" : "" };
  const showWhenVisible = { display: expand ? "" : "none" };

  const toggleExpand = () => {
    setExpand(!expand);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleExpand
    }
  })

  const blogStyle = {
    border: 'solid',
  }

  console.log(props)
  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title}
        <div style={hideWhenVisible}>
          <button onClick={toggleExpand}>Expand</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleExpand}>Close</button>
          <ul>
            <li>Written by: {props.blog.author}</li>
            <li>Likes: {props.blog.likes} <button>Like!</button></li>
            <li><a href={props.blog.url}>LINK</a></li>
            <li>{props.blog.user.username}</li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default Blog
