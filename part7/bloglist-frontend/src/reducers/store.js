import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './blogReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    message: messageReducer,
  }
});

export default store;