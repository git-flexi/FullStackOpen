import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { showMessage } from '../reducers/messageReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === '' ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()));
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(showMessage(`You voted '${anecdote.content}'`), 5);
  };

  return (
    anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div className='blog' key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  );
};

export default AnecdoteList;
