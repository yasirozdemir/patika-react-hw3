import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { city_name: city } = useParams();
  const [value, setValue] = useState();

  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const defaultUrl = `https://api.openweathermap.org/data/2.5/forecast?q=istanbul&appid=${apiKey}&units=metric`;

  useEffect(() => {
    if (city && city !== "") {
      if (city !== "current") {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        setUrl(url);
      } else {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lon } }) => {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
            setUrl(url);
          },
          (err) => {
            setError(err.message);
          }
        );
      }
    } else setUrl(defaultUrl);
  }, [city]);

  const getWeatherData = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const { data } = await axios.get(url);

      const _ = data.list.reduce((acc, el) => {
        const dt = el.dt_txt.slice(0, 10);

        const existingGroup = acc.find((group) => group.date === dt);

        if (existingGroup) existingGroup.data.push(el);
        else acc.push({ date: dt, data: [el] });

        return acc;
      }, []);

      const updatedValue = { ...value, cityDetails: data.city, weatherArr: _ };

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
            className="rounded-md border bg-white border-gray-200 p-2 font-thin outline-gray-800 transition-all duration-300 hover:bg-sky-50 mt-2"
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
