import { useState } from 'react';

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const addPerson = (e) => {
    e.preventDefault();

    if (newName === '') {
      alert(`Missing name string, try again!`);
      return;
    }

    const found = persons.find(({ name }) => name === newName) ? true : false;

    if (found) {
      alert(`${newName} already exists in phonebook!!`)
      setNewName('');
      setNewNumber('');
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1
      }));
      setNewName('');
      setNewNumber('');
    }
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
