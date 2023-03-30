/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload;
    },
  },
});

export const { setUserList } = userListSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll();
    dispatch(setUserList(response));
  };
};

export default userListSlice.reducer;
