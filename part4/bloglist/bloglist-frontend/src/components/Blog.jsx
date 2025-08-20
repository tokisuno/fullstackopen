import { useState, useImperativeHandle, forwardRef } from 'react';
import blogService from '../services/blogs';
import axios from 'axios';

const Blog = forwardRef((props, ref) => {
  const [expand, setExpand] = useState(false);
  const [likes, setLikes] = useState(`${props.blog.likes}`);

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

  const addLike = async () => {
    await blogService.newLike(props.blog)
    await setLikes(props.blog.likes)
  }

  const blogStyle = {
    border: 'solid',
  }

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
            <li>Likes: {likes} <button onClick={addLike}>「いいね」する</button></li>
            <li><a href={props.blog.url}>LINK</a></li>
            <li>Added by: {props.blog.user.username}</li>
          </ul>
        </div>
      </div>
    </div>
  )
})

export default Blog
