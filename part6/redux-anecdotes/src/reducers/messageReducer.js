import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    showMessage(state, action) {
      return action.payload;
    },
    clearMessage(state, action) {
      return '';
    }
  }
});

export const { showMessage, clearMessage } = messageSlice.actions;

export default messageSlice.reducer;