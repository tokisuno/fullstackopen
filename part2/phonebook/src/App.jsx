import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'

import personsService from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notif, setNotif] = useState(null);
  const [error, setError] = useState(false);

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
          setError(true);
          setNotif(`${personToRemove.name}'s entry was already deleted from the server!`);
          setPersons(persons.filter(person => person.id !== id))
        });
      setError(true);
      setNotif(`Removed ${personToRemove.name}'s entry`);
      setPersons(persons.filter(person => person.id !== id))
      setTimeout(() => {
        setNotif(null)
      }, 2000)
    }
  }

  return (
    <div>
      <h1>FullStackOpen</h1>
      <h2>Phonebook</h2>
      <Notification message={notif} error={error} />
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
        setNotif={setNotif}
        setError={setError}
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
