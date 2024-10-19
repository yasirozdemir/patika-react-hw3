import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WeatherContext = createContext();

const WeatherProvider = ({ children, current }) => {
  const [value, setValue] = useState({});
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { city_name: city } = useParams();

  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    const fetchUrl = () => {
      if (!current && city !== "") {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        setUrl(url);
      } else {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lon } }) => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            setUrl(url);
          },
          (err) => {
            console.error("Geolocation error: ", err);
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=istanbul&appid=${apiKey}&units=metric`;
            setUrl(url);
            setLoading(false);
          }
        );
      }
    };
    fetchUrl();
  }, [current, city]);

  useEffect(() => {
    const getWeatherData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        const updatedValue = {
          cityDetails: data.city,
          dayWeatherData: data.list.slice(0, 5),
          weekWeatherData: data.list.filter((_, i) => i % 8 === 0),
        };

        setValue(updatedValue);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [url]);

  return (
    <WeatherContext.Provider value={value}>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

export { useWeather, WeatherProvider };
