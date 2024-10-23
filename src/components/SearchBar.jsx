import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";

const SearchBar = () => {
  const { setUrl, getWeatherData } = useWeather();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    if (value !== " ") {
      const editedInput = "/" + value.replace(" ", "%20");
      navigate(editedInput, { replace: true });
      e.preventDefault();
    } else {
      alert("You should insert a city name!");
    }
  };

  const setCurrentLoc = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lon } }) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
        setUrl(url);
      }
    );
    navigate("/", { replace: true });
    getWeatherData();
  };

  const _ClassList =
    "w-full rounded-md border bg-white border-gray-200 p-2 font-thin outline-gray-800 transition-all duration-300 hover:bg-sky-50 mb-4";

  return (
    <div className="mt-8 text-lg sm:text-xl">
      <form className="flex flex-col" onSubmit={handleSearch}>
        <label htmlFor="search" className="text-center text-gray-800 mb-2">
          Search for a city...
        </label>
        <input
          id="search"
          type="text"
          name="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={_ClassList}
        />
      </form>

      <button id="current" className={_ClassList} onClick={setCurrentLoc}>
        Show weather forecast for my current location
      </button>
    </div>
  );
};

export default SearchBar;
