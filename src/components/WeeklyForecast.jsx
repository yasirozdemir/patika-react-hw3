import { useWeather } from "../context/WeatherContext";
import { formatDate } from "../lib/Functions";

const WeeklyForecast = () => {
  const today = new Date().toLocaleDateString(undefined, { weekday: "long" });
  const { weekWeatherData } = useWeather();

  return (
    <ul className="flex gap-x-2 justify-between mx-auto py-2">
      {weekWeatherData?.length !== 0 &&
        weekWeatherData.map((el) =>
          today !== formatDate(el.dt, "EEEE") ? (
            <li
              key={el.dt}
              className="bg-white rounded-md text-center flex-grow border borde-gray-200"
            >
              <p className="border-b border-b-gray-200 font-serif py-2">
                {formatDate(el.dt, "EEEE")}
              </p>
              <img
                className="mx-auto"
                src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                alt={el.weather[0].main}
              />
              <p className="">
                {(Math.round(el.main.temp * 100) / 100).toFixed(0)}°C
              </p>
              <p className="text-gray-700 font-thin text-sm capitalize mb-2">
                {el.weather[0].description}
              </p>
            </li>
          ) : (
            ""
          )
        )}
    </ul>
  );
};

export default WeeklyForecast;
