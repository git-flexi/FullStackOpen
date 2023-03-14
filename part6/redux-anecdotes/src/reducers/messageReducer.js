import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage(state, action) {
      return '';
    }
  }
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const showMessage = (message, time) => {
  return dispatch => {
    if (!time) {
      time = 5;
    }

    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(clearMessage());
    }, time * 1000);
  };
};

export default messageSlice.reducer;