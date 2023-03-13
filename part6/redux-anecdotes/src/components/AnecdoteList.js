import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log('filter:', filter);
    return filter === '' ? anecdotes
      : anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()));
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div className='blog' key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  );
};

export default AnecdoteList;
