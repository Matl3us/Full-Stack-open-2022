import { useState } from 'react'

const Number = ({ number }) => {
  return (
    <div>{number.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    const checkIfExists = (object) => {
      if (JSON.stringify(object) === JSON.stringify(personObject))
        return false
      else
        return true
    }

    if (persons.every(checkIfExists)) {
      setPersons(persons.concat(personObject))
      setNewName('')
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Number key={person.name} number={person} />)}
      </div>
    </div>
  )
}

export default App