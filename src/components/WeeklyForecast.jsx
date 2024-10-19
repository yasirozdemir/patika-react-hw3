import { useWeather } from "../context/WeatherContext";
import { unixToDate } from "../lib/Functions";

const WeeklyForecast = () => {
  const { weekWeatherData } = useWeather();

  return (
    <>
      {weekWeatherData?.length !== 0 &&
        weekWeatherData.map((el) => (
          <li key={el.dt}>
            <p>Day: {unixToDate(el.dt, "ccc")}</p>
            <p>Date: {unixToDate(el.dt, "LLL do")}</p>
            <p>Time: {unixToDate(el.dt, "p")}</p>
            <p>Temp: {(Math.round(el.main.temp * 100) / 100).toFixed(1)}°</p>
            <img
              src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
              alt={el.weather[0].main}
            />
            <br />
            <br />
          </li>
        ))}
    </>
  );
};

export default WeeklyForecast;
