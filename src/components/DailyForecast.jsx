import { useWeather } from "../context/WeatherContext";
import { formatDate } from "../lib/Functions";

const DailyForecast = () => {
  const { dayWeatherData } = useWeather();

  return (
    <div className="bg-white rounded-md mx-auto border border-gray-200">
      <p className="text-xl text-center border-b border-b-gray-200 py-2 font-serif">
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
        })}
      </p>
      <ul className="grid grid-cols-5 py-2">
        {dayWeatherData?.length !== 0 &&
          dayWeatherData.map((el) => (
            <li
              key={el.dt}
              className="flex flex-col content-center items-center"
            >
              <p className="">{formatDate(el.dt, "h aa")}</p>

              <img
                className=""
                src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                alt={el.weather[0].main}
              />

              <p className="">
                {(Math.round(el.main.temp * 100) / 100).toFixed(0)}°
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
