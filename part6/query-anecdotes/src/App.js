import { useQuery, useQueryClient, useMutation } from 'react-query';
import { updateAnecdote, getAnecdotes } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (changedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.map((anecdote) => anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote));
    }
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote };
    updatedAnecdote.votes += 1;
    newAnecdoteMutation.mutate(updatedAnecdote);
  };

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    { refetchOnWindowFocus: false }
  );

  if (result.isLoading) {
    return <div>loading data...</div>;
  };

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div className='content'>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
