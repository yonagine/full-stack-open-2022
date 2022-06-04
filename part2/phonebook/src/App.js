import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(person => {
        setPersons(person)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setMessage(null), 5000)
    return () => clearTimeout(timer)
  }, [message])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber,
    }
    
    if (newName.length && newNumber.length) {
      if (persons.find(person => person.name === newName)) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
          const existingPerson = persons.find((person) => person.name === newName)

          phonebookService
            .update(existingPerson.id, person)
            .then(updatedPerson => {
              const updatedPersons = persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )

              setPersons(updatedPersons)
              setMessage(`Updated ${newName}'s number in the phonebook.`)
            })
            .catch(error => {
              console.log(error.message)

              setPersons(persons.filter((person) => person.name !== existingPerson.name))
              setMessage(`ERROR: Could not update the number of '${person.name}'. '${person.name}' may not exist or may have already deleted from the phonebook.`)
            })
        }
      }
      else if (persons.find(person => person.number === newNumber)) {
        setMessage(`The number ${newNumber} already exists in the phonebook. An existing person may already have this number.`)
      } else {
        phonebookService
          .create(person)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setMessage(`Added ${returnedPerson.name} to the phonebook.`)
          })
          .catch(error => {
            console.log(error.message)
            setMessage(`ERROR: Could not create phonebook entry. See console for more details.`)
          })
      }
    }

    setNewName('')
    setNewNumber('')
  }
  
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      phonebookService
        .remove(id)
        .then(response => {
          const newPersons = persons.filter((person) => person.id !== id)
          setPersons(newPersons)
          setMessage(`Deleted entry of '${name}' from phonebook.`)
        })
        .catch(error => {
          console.log(error.message)
          setMessage(`ERROR: '${name}' does not exist or has already been deleted from the phonebook.`)
        })
    }
  }
  
  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add new</h3>

      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        handleName={handleNameChange}
        handleNumber={handleNumberChange}
      />
      
      <h3>Numbers</h3>

      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App;