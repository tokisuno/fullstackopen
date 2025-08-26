import { useState, useImperativeHandle } from 'react';

const Blog = (props) => {
  const [expand, setExpand] = useState(false);

  const hideWhenVisible = { display: expand ? 'none' : '' };
  const showWhenVisible = { display: expand ? '' : 'none' };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  useImperativeHandle(props.ref, () => {
    return {
      toggleExpand
    };
  });

  const blogStyle = {
    border: 'solid',
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title} {props.blog.author}
        <div style={hideWhenVisible}>
          <button onClick={toggleExpand}>Expand</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleExpand}>Close</button>
          <ul>
            <li>Likes: {props.blog.likes} <button onClick={() => {props.addLike(props.blog.id);}}>Like!</button></li>
            <li><a href={props.blog.url}>LINK</a></li>
            <li>Added by: {props.blog.user.name} ({props.blog.user.username})</li>
            <li><button onClick={() => {props.remove(props.blog);}}>Delete</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
