import { useState } from 'react';
import personsService from '../services/persons.js';

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    if (newName === '') {
      alert(`Missing name string, try again!`);
      return;
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      id: String(Number(persons[persons.length - 1].id) + 1)
    }

    const found = persons.find(({ name }) => name === newName) ? true : false;

    if (found) {
      const foundPerson = persons.find(({ name }) => name === newName.trim());
      if (window.confirm(`${foundPerson.name} exists already. Update their number?`)) {
        const updatedPerson = { ...foundPerson, number: newNumber };
        personsService
          .update(foundPerson, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === foundPerson.id ? returnedPerson : person));
            setNewName('');
            setNewNumber('');
          })
        return;
      }
      setNewName('');
      setNewNumber('');
    }
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
      })
  }

  const handleNameInput = (e) => setNewName(e.target.value);
  const handleNumberInput = (e) => setNewNumber(e.target.value);

  return (
    <form onSubmit={addPerson}>
      <div>
        <div>name: <input value={newName} onChange={handleNameInput} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
