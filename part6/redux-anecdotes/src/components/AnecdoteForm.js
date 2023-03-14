import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showMessage, clearMessage } from '../reducers/messageReducer';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = async (event) => {
    event.preventDefault();
    const newAnecdote = await anecdoteService.createNew(event.target.contentInput.value);
    dispatch(createAnecdote(newAnecdote));
    dispatch(showMessage(`Anecdote '${newAnecdote.content}' created`));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
    event.target.contentInput.value = '';
  };

  return (
    <form onSubmit={createNew}>
      <h2>create new</h2>
      <div><input name='contentInput' /></div>
      <button type='submit'>create</button>
    </form>
  );
};

export default AnecdoteForm;