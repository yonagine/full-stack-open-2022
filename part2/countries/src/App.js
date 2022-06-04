import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState(countries)
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    const query = event.target.value
    setFilter(query)
    setCountriesToShow(
      countries.filter((country) => country.name.common.toLowerCase().includes(query)))
  }

  const showInfo = (country) => {
    if (country.showInfo === undefined) {
      country.showInfo = true
    } else {
      country.showInfo = !country.showInfo
    }

    setCountriesToShow([...countriesToShow])
  }

  useEffect(() => {
    console.log('effect')

    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {countriesToShow.length === 1 ?
        (<CountryInfo country={countriesToShow[0]} />) :
        null
      }
      {countriesToShow.length > 10 ? 
        (<p>Too many matches, specify another filter.</p>) : 
        (<Countries countries={countriesToShow} showInfo={showInfo} />) 
      }
    </div>
  )
}

export default App;
