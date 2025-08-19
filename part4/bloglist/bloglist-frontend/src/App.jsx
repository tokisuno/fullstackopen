// TODO:
// - [ ] Implement Togglable
// - [ ] Migrate old toggle code to use Togglable component
// - [ ] Make "blog-creation" functionality pop up as a toggle

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);

  // all for creating a new blog @@
  const [newTitle, setNewTitle] = useState("");
  const [newURL, setNewURL] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleTitleChange = (event) => setNewTitle(event.target.value);
  const handleAuthorChange = (event) => setNewAuthor(event.target.value);
  const handleURLChange = (event) => setNewURL(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        "loggedBloglistappUser",
        JSON.stringify(user),
      );

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage("Login Successful! Code: 200");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } catch (exception) {
      setErrorMessage("Validation Error. Code: 401");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
        <button
          onClick={() => {
            setLoginVisible(false);
          }}
        >
          Cancel
        </button>
      </div>
    );
  };

  const handleLogout = () => {
    setUser("");
    window.localStorage.clear();
  };

  const addBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setErrorMessage(
          `Blog post "${returnedBlog.title}" made successfully! Code 200`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(`${error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h3>create new</h3>
      <div>
        Title::
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author::
        <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        Url::
        <input value={newURL} onChange={handleURLChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in!</p>
          <button onClick={() => handleLogout()}>Logout</button>

          {blogForm()}

          {blogs.map((blog) => {
            return <Blog key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
