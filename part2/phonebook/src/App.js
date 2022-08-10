import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const peopleToShow = persons.filter(
    person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const checkIfExists = (object) => {
      if (object.name === personObject.name)
        return false
      else
        return true
    }

    if (persons.every(checkIfExists)) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm submit={addPerson} name={newName} number={newNumber}
        nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      {peopleToShow.map(person =>
        <Person key={person.id} number={person} />)}
    </div>
  )
}

export default App