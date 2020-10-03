import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEYS = '022945c267d505068c75bda48292a41c';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
           q: query,
           units: 'metric',
           APPID: API_KEYS,
        }
    });

    return data;
}