import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showMessage } from '../reducers/messageReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = async (event) => {
    event.preventDefault();
    const newContent = event.target.contentInput.value;
    event.target.contentInput.value = '';
    dispatch(createAnecdote(newContent));
    dispatch(showMessage(`Anecdote '${newContent}' created`), 5);
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