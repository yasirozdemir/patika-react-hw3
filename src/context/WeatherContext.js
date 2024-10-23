import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState({});
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { city_name: city } = useParams();

  useEffect(() => {
    const fetchUrl = () => {
      if (city && city !== "") {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
        setUrl(url);
      } else {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lon } }) => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
            setUrl(url);
          },
          (err) => {
            console.error("Geolocation error: ", err);
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=istanbul&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
            setUrl(url);
            setLoading(false);
          }
        );
      }
    };
    fetchUrl();
  }, [city]);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [url]);

  const handleRefresh = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <WeatherContext.Provider value={value}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="flex flex-col">
          <p>{error}</p>
          <button
            id="refresh"
            onClick={handleRefresh}
            className="bg-white border border-gray-800 px-2 rounded-md mt-2"
          >
            Refresh the page
          </button>
        </div>
      ) : (
        children
      )}
    </WeatherContext.Provider>
  );
};

const useWeather = () => useContext(WeatherContext);

export { useWeather, WeatherProvider };
