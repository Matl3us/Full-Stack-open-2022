import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (countries.length > 1) {
    return (
      countries.map(country =>
        <div key={country.name.common}>{country.name.common}</div>)
    )
  }
  else {
    return (
      countries.map(country =>
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages).map(name =>
              <li key={name}>{name}</li>
            )}
          </ul>
          <img src={country.flags.png} alt="Country flag"></img>
        </div>)
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(
    country =>
      country.name.common.toLowerCase().includes(
        filter.toLowerCase()
      )
  )

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries
        <input
          value={filter}
          onChange={handleFilter}
        />
      </div>
      <div>
        <Country countries={filteredCountries} />
      </div>
    </div>
  )
}

export default App