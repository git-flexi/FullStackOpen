/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import blogService from '../services/blogService';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export const checkLogin = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    dispatch(setUser(null));
  };
};

export default userSlice.reducer;