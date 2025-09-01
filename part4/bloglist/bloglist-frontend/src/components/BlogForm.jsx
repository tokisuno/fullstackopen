import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newURL, setNewURL] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL
    });

    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  };

  return (
    <div>
      <h2>Add a new blog!</h2>
      <form onSubmit={addBlog}>
        <label>
          title
          <input
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder="Wanna learn LaTeX?"
          />
        </label>
        <label>
          author
          <input
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder="Luke Smith"
          />
        </label>
        <label>
          url
          <input
            value={newURL}
            onChange={event => setNewURL(event.target.value)}
            placeholder="https://lukesmith.xyz/articles/wanna-learn-latex/"
          />
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
