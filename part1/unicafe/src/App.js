import { useState } from 'react';

const Button = ({ handler, buttonText }) => {
  return (
    <button onClick={handler}>{buttonText}</button>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  const average = ((good - bad) / total).toFixed(2);
  const positives = (good * 100 / total).toFixed(2);

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='total' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positives' value={positives + '%'} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => setGood(good + 1);
  const neutralFeedback = () => setNeutral(neutral + 1);
  const badFeedback = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handler={goodFeedback} buttonText='good' />
      <Button handler={neutralFeedback} buttonText='neutral' />
      <Button handler={badFeedback} buttonText='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;