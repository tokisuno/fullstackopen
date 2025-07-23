import { useState } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newFilter, setNewFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter person</h3>
      <Filter
        setShowAll={setShowAll}
        newFilter={newFilter}
        setNewFilter={setNewFilter} />
      <h3>Add a new entry</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        showAll={showAll}
        newFilter={newFilter} />
    </div >
  )
}

export default App
