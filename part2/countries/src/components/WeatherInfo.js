import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({city, lat, lon}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily&appid=${api_key}`

        axios
            .get(uri)
            .then(response => {
                setWeather(response.data)
            })
    }, [lat, lon])

    return (
        <>
            {weather.length !== 0 ? (
                <div>
                    <h1>Weather in {city}</h1>
                    <p>Temperature: {weather.current.temp} Celsius</p>
                    <img src="http://openweathermap.org/img/wn/03d@2x.png" alt={weather.current.temp} />
                    <p>Wind: {weather.current.wind_speed} m/s</p>
                </div>
            ) : null}
        </>
    )
}

export default WeatherInfo;