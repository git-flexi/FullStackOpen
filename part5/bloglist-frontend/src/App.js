import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Togglable from './components/Toggable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Message from './components/Message';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showSuccessMessage = (messageText) => {
    const errorMessage = { messageText: messageText, type: 'success' };
    setMessage(errorMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const showErrorMessage = (messageText) => {
    const errorMessage = { messageText: messageText, type: 'error' };
    setMessage(errorMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      showErrorMessage(exception.response.data.error);
    }
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const createdBlock = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlock));
      showSuccessMessage(`A new Blog ${createdBlock.title} by ${createdBlock.author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      showErrorMessage(exception.response.data.error);
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog);
      setBlogs(blogs.map((each) => each.id === updatedBlog.id ? updatedBlog : each));
    } catch (exception) {
      showErrorMessage(exception.response.data.error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog);
      setBlogs(blogs.filter((each) => each.id !== blog.id));
    } catch (exception) {
      showErrorMessage(exception.response.data.error);
    }
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel='log in'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  return (
    <div className='content'>
      <h1>Blogs</h1>
      <Message messageObject={message} />
      {!user && loginForm()}
      {user && <div><div>{user.name} logged in</div><button type="button" onClick={handleLogout}>logout</button></div>}
      {user && blogForm()}
      <div>
        <h2>Blogs</h2>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} user={user} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default App;