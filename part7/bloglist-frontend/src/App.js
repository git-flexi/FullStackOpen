import { useState, useEffect } from 'react';
import { showErrorMessage } from './reducers/messageReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { checkLogin, login } from './reducers/userReducer';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Message from './components/Message';
import Menu from './components/Menu';
import BlogInfoMain from './components/bloginfo/BlogInfoMain';
import UserInfoList from './components/userinfo/UserInfoList';
import UsersInfo from './components/userinfo/UserInfo';
import BlogInfo from './components/bloginfo/BlogInfo';
import { Container } from '@mui/material';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/');
    } catch (exception) {
      dispatch(showErrorMessage(exception.response.data.error));
    }
  };

  return (
    <Container>
      <Menu />
      <Message />
      <Routes>
        <Route path="/" />
        <Route path="/login" element={<LoginForm username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin} />} />
        <Route path="/blogs" element={<BlogInfoMain />} />
        <Route path="/users" element={<UserInfoList />} />
        <Route path="/users/:id" element={<UsersInfo />} />
        <Route path="/blogs/:id" element={<BlogInfo />} />
      </Routes>
    </Container>
  );
};

export default App;
