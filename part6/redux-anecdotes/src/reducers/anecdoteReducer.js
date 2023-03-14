import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  },
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updateObject = { ...anecdote, votes: anecdote.votes + 1 };
    const anecdotes = await anecdoteService.update(updateObject);
    dispatch(updateAnecdote(anecdotes));
  };
};

export default anecdoteSlice.reducer;
