import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.contentInput.value));
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