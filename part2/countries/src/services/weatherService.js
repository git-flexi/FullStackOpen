import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const getWeather = (country) => {
    const [lat, lon] = country.latlng;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

    const request = axios.get(url);
    return request.then(response => response.data);
};

const exportedObject = {
    getWeather
};

export default exportedObject;


