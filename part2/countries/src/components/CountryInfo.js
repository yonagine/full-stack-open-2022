import WeatherInfo from "./WeatherInfo"

const CountryInfo = ({country}) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <strong>languages:</strong>
            <ul>
                {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.official + "'s flag"} />
            <WeatherInfo city={country.capital} lat={country.latlng[0]} lon={country.latlng[1]} />
        </>
    )
}

export default CountryInfo;