import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import personService from './services/persons'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  if (!error)
    return (
      <div className='success'>
        {message}
      </div>
    )
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

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
          setMessage(`Added ${personObject.name}`)
          setError(false)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
    }
    else {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === personObject.name)
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setMessage(`Number changed to ${personObject.name}`)
            setError(false)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
          .catch(error => {
            setMessage(`Information of ${personObject.name} has already been removed form the server`)
            setError(true)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    }
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

  const handleDeletion = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Number deleted`)
          setError(false)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter value={filter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm submit={addPerson} name={newName} number={newNumber}
        nameHandler={handleNameChange} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      {peopleToShow.map(person =>
        <Person key={person.id} number={person}
          handleDeletion={() => handleDeletion(person.id)} />)}
    </div>
  )
}

export default App