import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showErrorMessage } from './reducers/messageReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { useSelector } from 'react-redux';
import blogService from './services/blogService';
import loginService from './services/login';
import Togglable from './components/Toggable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Message from './components/Message';

const App = () => {
  const blogs = useSelector(state => state.blogs);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
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
    <div className="content">
      <h1>Blogs</h1>
      <Message />
      {!user && loginForm()}
      {user && (
        <div>
          <div>{user.name} logged in</div>
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
      {user && blogForm()}
      <div>
        <h2>Blogs</h2>
        {blogs.slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
