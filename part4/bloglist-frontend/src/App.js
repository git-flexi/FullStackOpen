import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Message from './components/Message';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

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

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const createdBlock = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlock));
      showSuccessMessage(`A new Blog ${createdBlock.title} by ${createdBlock.author} added`);
      setNewBlog({ author: '', title: '', url: '' });
    } catch (exception) {
      showErrorMessage(exception.response.data.error);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div className='input-block'>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className='input-block'>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <>
      <h2>Create Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div className='input-block'>
          <label>Title:</label>
          <input type='text' name='title' id='title' value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        </div>
        <div className='input-block'>
          <label>Author:</label>
          <input name='author' id='author' value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        </div>
        <div className='input-block'>
          <label>Url:</label>
          <input name='url' id='url' value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );

  return (
    <div className='content'>
      <h1>Blogs</h1>
      <Message messageObject={message} />
      {!user && loginForm()}
      {user && <div>{user.name} logged in<button type="button" onClick={handleLogout}>logout</button></div>}
      {user && blogForm()}
      {user && <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  );
};

export default App;