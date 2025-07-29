const Persons = ({ persons, showAll, newFilter, removePerson }) => {
  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter));

  return (
    namesToShow.map(person => {
      return (
        <div key={`${person.name}-div`}>
          <p key={person.name}>{person.name} {person.number}</p>
          <button key={`${person.name}-button`} onClick={() => removePerson(person.id)}>Remove</button>
        </div>
      )
    })
  )
}

export default Persons
