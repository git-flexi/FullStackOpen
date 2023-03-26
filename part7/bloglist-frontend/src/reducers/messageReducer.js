/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage(state, action) {
      return null;
    }
  }
});

export const { setMessage, clearMessage } = messageSlice.actions;

const showMessage = (message, messageType, time) => {
  return dispatch => {
    if (!time) {
      time = 5;
    }

    const messageObject = { text: message, type: messageType };

    dispatch(setMessage(messageObject));
    setTimeout(() => {
      dispatch(clearMessage());
    }, time * 1000);
  };
};

export const showSuccessMessage = (message, time) => {
  return dispatch => {
    dispatch(showMessage(message, 'success', time));
  };
};

export const showErrorMessage = (message, time) => {
  return dispatch => {
    dispatch(showMessage(message, 'error', time));
  };
};

export default messageSlice.reducer;