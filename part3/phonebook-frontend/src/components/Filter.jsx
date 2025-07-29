import { useState } from 'react'

const Filter = ({ newFilter, setNewFilter, setShowAll }) => {

  const handleFilterInput = (e) => {
    setNewFilter(e.target.value);
    if (newFilter !== '') {
      setShowAll(false);
      setNewFilter(e.target.value);
    } else {
      setShowAll(true);
    }
  }

  return (
    <input value={newFilter} onChange={handleFilterInput} />
  )

}
export default Filter
