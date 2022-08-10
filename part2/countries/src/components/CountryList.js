import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, selected, setCountry, weather, setWeather, api_key }) => {
    if (countries.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
    else if (countries.length > 1) {
      const showDetails = () => {
        if (selected.length !== 0)
          return (
            <Country country={selected} weather={weather}
              setWeather={setWeather} api_key={api_key} />
          )
        else
          return (
            <p>Non selected.</p>
          )
      }
  
      return (
        <div>
          {countries.map(country =>
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => setCountry(country)}>
                show
              </button>
            </div>)}
          {showDetails()}
        </div>
      )
    }
    else if (countries.length === 1) {
      return (
        <Country country={countries[0]} weather={weather}
          setWeather={setWeather} api_key={api_key} />
      )
    }
  }
  
  const Country = ({ country, weather, setWeather, api_key }) => {
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
    }, [country])
  
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(name =>
            <li key={name}>{name}</li>
          )}
        </ul>
        <img src={country.flags.png} alt="Country flag"></img>
        <h2>Weather in {country.capital}</h2>
        <Weather weather={weather} />
      </div>
    )
  }
  
  const Weather = ({ weather }) => {
    if (weather !== '')
      return (
        <div>
          <p>temperature {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"></img>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )
  }

export default CountryList