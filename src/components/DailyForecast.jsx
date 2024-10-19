import { useWeather } from "../context/WeatherContext";
import { unixToDate } from "../lib/Functions";

const DailyForecast = () => {
  const { dayWeatherData } = useWeather();
  const _ClassList = "font-thin text-lg";

  return (
    <>
      {dayWeatherData?.length !== 0 &&
        dayWeatherData.map((el) => (
          <li key={el.dt} className={_ClassList}>
            <p>{unixToDate(el.dt, "h aa")}</p>
            <p>{(Math.round(el.main.temp * 100) / 100).toFixed(1)}°</p>
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

export default DailyForecast;
