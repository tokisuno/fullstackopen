import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'

import personsService from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialNames => setPersons(initialNames))
  }, [])


  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${personToRemove.name}?`)) {
      personsService.remove(personToRemove)
        .catch(err => {
          alert(
            `The person ${id} was already deleted`
          )
          setPersons(persons.filter(person => person.id !== id))
        });
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h1>FullStackOpen</h1>
      <h2>Phonebook</h2>
      <h3>Filter person</h3>
      <Filter
        setShowAll={setShowAll}
        newFilter={newFilter}
        setNewFilter={setNewFilter}
      />
      <h3>Add a new entry</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        showAll={showAll}
        newFilter={newFilter}
        removePerson={removePerson}
      />
    </div >
  )
}

export default App
