import { useState, useEffect } from 'react';

import weatherService from '../services/weatherService';

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        weatherService.getWeather(country)
            .then(data => {
                setWeatherData(data);
            });
    }, [country]);

    if (weatherData === null) {
        return (
            <div>
                <h3>Loading weatherdata for {country.capital}...</h3>
            </div>
        );
    }

    const temp = weatherData.main.temp;
    const weatherIcon = weatherData.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const weatherDescription = weatherData.weather[0].description;
    const wind = weatherData.wind.speed;

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <div>Temperature: {temp} C°</div>
            <img src={weatherIconUrl} alt={weatherDescription} />
            <div>Wind: {wind} m/s</div>
        </div>
    );
};

export default Weather;