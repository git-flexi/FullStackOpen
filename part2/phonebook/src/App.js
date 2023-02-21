import { useState, useEffect } from 'react';

import personService from './services/personService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Message from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const personChange = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const showSuccessMessage = (messageText) => {
    const successMessage = { messageText: messageText, type: 'success' };
    setMessage(successMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const showErrorMessage = (messageText) => {
    const errorMessage = { messageText: messageText, type: 'error' };
    setMessage(errorMessage);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const personSubmit = (event) => {
    event.preventDefault();

    if (newPerson.name === '' || newPerson.number === '') {
      alert('Both fields need to be filled to create a new entry in the phonebook');
      return;
    }

    if (persons.some(person => { return person.number.toUpperCase() === newPerson.number.toUpperCase(); })) {
      alert(`The number ${newPerson.number} is alreay added to phonebook`);
      return;
    }

    if (persons.some(person => { return person.name.toUpperCase() === newPerson.name.toUpperCase(); })) {
      if (!window.confirm(`The name ${newPerson.name} is already in the phonebook. Do you want to replace the old number with a new one?`)) {
        return;
      }

      const existingPerson = persons.find(person => person.name.toUpperCase() === newPerson.name.toUpperCase());
      existingPerson.number = newPerson.number;

      personService.update(existingPerson.id, existingPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => { return person.id !== returnedPerson.id ? person : returnedPerson; }));
          setNewPerson({ name: '', number: '' });
          showSuccessMessage(`${returnedPerson.name} successfully updated!`);
        })
        .catch(error => {
          showErrorMessage(`Information for ${existingPerson.name} has already been removed from the server!`);
          setNewPerson({ name: '', number: '' });
          setPersons(persons.filter(person => person.id !== existingPerson.id));
        });
    } else {
      personService.add(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson({ name: '', number: '' });
          showSuccessMessage(`${returnedPerson.name} successfully added!`);
        });
    }
  };

  const deleteEntry = (id) => {
    const deletePerson = persons.find(person => person.id === id);
    if (!window.confirm(`Do you really want to delete ${deletePerson.name}?`)) {
      return;
    }

    personService.remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message messageObject={message} />
      <Filter filterValue={filter} filterChange={filterChange} />
      <h3>Add a new entry</h3>
      <PersonForm person={newPerson} changeHandler={personChange} submitHandler={personSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteHandler={deleteEntry} />
    </div>
  );
};

export default App;