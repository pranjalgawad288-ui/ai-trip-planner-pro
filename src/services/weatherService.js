import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city) => {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: API_KEY, units: "metric" },
  });
  return {
    temp: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
};
