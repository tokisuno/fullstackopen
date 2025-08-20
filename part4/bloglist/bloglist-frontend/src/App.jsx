import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const loginFormRef = useRef();
  const blogFormRef = useRef();

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

      window.localStorage.setItem( "loggedBloglistappUser", JSON.stringify(user));

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

  const handleLogout = () => {
    setUser("");
    window.localStorage.clear();
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
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

  const removeBlog = (blog) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      blogService
        .remove(blog)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
          setErrorMessage(`Blog post was successfully removed! Code 200`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        })
        .catch((error) => {
          setErrorMessage(`${error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        })
    } else {
      return;
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {!user && <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>}

      {user && (
        <div>
          <p>{user.name} logged in!</p>
          <button onClick={() => handleLogout()}>Logout</button>

          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

          {blogs.sort((a, b) => b.likes - a.likes).map((blog) => {
            return <Blog key={blog.id} blog={blog} remove={removeBlog}/>;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
