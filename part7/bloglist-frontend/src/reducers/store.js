import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './blogReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import userListReducer from './userListReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
    blogs: blogReducer,
    message: messageReducer,
  },
});

export default store;
