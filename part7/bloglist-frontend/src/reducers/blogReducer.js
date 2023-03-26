import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter((each) => each.id !== action.payload.id);
    }
  },
});

export const { appendBlog, updateBlog, setBlogs, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog);
    dispatch(appendBlog(blog));
  };
};

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch(removeBlog(blog));
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    const updateObject = { ...blog, likes: blog.likes + 1 };
    const blogs = await blogService.update(updateObject);
    dispatch(updateBlog(blogs));
  };
};

export default blogSlice.reducer;
