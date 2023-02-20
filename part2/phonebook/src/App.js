import { useState, useEffect } from 'react';

import personService from './services/personService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
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

    if (persons.some(person => { return person.number.toUpperCase() === newNumber.toUpperCase(); })) {
      alert(`The number ${newNumber} is alreay added to phonebook`);
      return;
    }

    if (persons.some(person => { return person.name.toUpperCase() === newName.toUpperCase(); })) {
      if (!window.confirm(`The name ${newName} is already in the phonebook. Do you want to replace the old number with a new one?`)) {
        return;
      }

      const existingPerson = persons.find(person => person.name.toUpperCase() === newName.toUpperCase());
      existingPerson.number = newNumber;

      personService.update(existingPerson.id, existingPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => { return person.id !== returnedPerson.id ? person : returnedPerson; }));
          setNewName('');
          setNewNumber('');
        });
    } else {
      personService.add()
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const deleteEntry = (id, name) => {
    if (!window.confirm(`Do you really want to delete ${name}?`)) {
      return;
    }

    personService.remove(id)
      .then(returnedPerson => {
        console.log(returnedPerson);
        setPersons(persons.filter(person => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} filterChange={filterChange} />
      <h3>Add a new entry</h3>
      <PersonForm nameValue={newName} nameChange={nameChange} numberValue={newNumber} numberChange={numberChange} submitHandler={addEntry} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteHandler={deleteEntry} />
    </div>
  );
};

export default App;