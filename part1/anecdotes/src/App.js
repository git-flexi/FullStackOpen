import { useState } from 'react';

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const Button = ({ clickHandler, text }) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  );
};

const WinnerWinnerChickenDinner = ({ anecdotes, votes }) => {
  const totalVotes = votes.reduce((a, b) => { return a + b; });
  if (totalVotes === 0) {
    return;
  }

  const highestVoteValue = Math.max(...votes);
  const indexOfWinner = votes.indexOf(highestVoteValue);

  return (
    <div>
      <h1>Anecdote with the most votes:</h1>
      <p>{anecdotes[indexOfWinner]}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  console.log('Selected index: ', selected);
  console.log('Votes: ', votes);

  const randomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * (anecdotes.length - 1)) + 1;
    setSelected(randomNumber);
  };

  const voteForAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button clickHandler={voteForAnecdote} text='vote' />
      <Button clickHandler={randomAnecdote} text='next anecdote' />
      <WinnerWinnerChickenDinner anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;