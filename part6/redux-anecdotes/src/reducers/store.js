import { configureStore } from '@reduxjs/toolkit';

import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';
import messageReducer from './messageReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    message: messageReducer
  }
});

export default store;