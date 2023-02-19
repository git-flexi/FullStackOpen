import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('Response received!', response);
        setPersons(response.data);
      });
  }, []);

  const nameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const addEntry = (event) => {
    event.preventDefault();

    if (newName === '' || newNumber === '') {
      alert('Both fields need to be filled to create a new entry');
      return;
    }

    if (persons.some(person => { return person.name.toUpperCase() === newName.toUpperCase(); })) {
      alert(`${newName} is alreay added to phonebook`);
      return;
    }

    if (persons.some(person => { return person.number.toUpperCase() === newNumber.toUpperCase(); })) {
      alert(`${newNumber} is alreay added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} filterChange={filterChange} />
      <h3>Add a new entry</h3>
      <PersonForm nameValue={newName} nameChange={nameChange} numberValue={newNumber} numberChange={numberChange} submitHandler={addEntry} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;