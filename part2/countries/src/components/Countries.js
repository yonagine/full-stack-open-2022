import CountryInfo from './CountryInfo'

const Countries = ({countries, showInfo}) => {
    return (countries.length === 1 ?
        null :
        <ul>
            {countries.map((country) => {
                return (
                    <li key={country.name.official}>
                        {country.name.common}
                        <button onClick={() => showInfo(country)}>Show</button>
                        {country.showInfo === true ?
                        <CountryInfo country={country} /> :
                        null}
                    </li>
                )}
            )}
        </ul>
    )
}

export default Countries;