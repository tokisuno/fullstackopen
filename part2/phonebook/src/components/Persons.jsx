const Persons = ({ persons, showAll, newFilter }) => {
  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter));

  return (
    namesToShow.map(person => {
      return (
        <p key={person.name}>{person.name} {person.number}</p>
      )
    })
  )
}

export default Persons
