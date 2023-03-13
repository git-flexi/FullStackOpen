import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import reducer from './reducer';
import './style.css';

const store = createStore(reducer);

const App = () => {
  return (
    <div className='content'>
      <div>
        <button id='good' onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button id='ok' onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
        <button id='bad' onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
        <button id='zero' onClick={() => store.dispatch({ type: 'ZERO' })}>reset</button>
      </div>
      <div>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);