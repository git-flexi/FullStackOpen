import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showErrorMessage } from './reducers/messageReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { checkLogin, login, logout } from './reducers/userReducer';
import { useSelector } from 'react-redux';
import Togglable from './components/Toggable';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Message from './components/Message';

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(login(username, password));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
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
          <button type="button" onClick={() => dispatch(logout())}>
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
              blog={blog}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
