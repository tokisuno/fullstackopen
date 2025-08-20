import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  // all for creating a new blog @@
  const [newTitle, setNewTitle] = useState("");
  const [newURL, setNewURL] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    })

    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  }

  return (
    <div>
      <h2>Add a new blog!</h2>
      <form onSubmit={addBlog}>
        Title::
        <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/>
        Author::
        <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/>
        URL::
        <input value={newURL} onChange={event => setNewURL(event.target.value)}/>
        <button type="submit">Save!</button>
      </form>
    </div>
  )
}

export default BlogForm
