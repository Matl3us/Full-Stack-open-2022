import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState('')
  const [filter, setFilter] = useState('')
  const [selected, setCountry] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

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
        <CountryList countries={filteredCountries}
          selected={selected} setCountry={setCountry}
          weather={weather} setWeather={setWeather}
          api_key={api_key} />
      </div>
    </div>
  )
}

export default App