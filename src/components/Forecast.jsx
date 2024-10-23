import { formatDate, formatIsoDate } from "../lib/Functions";
import { useWeather } from "../context/WeatherContext";

const Forecast = () => {
  const { weatherArr } = useWeather();
  const today = new Date().toLocaleDateString(undefined, { weekday: "long" });

  return (
    <div>
      {weatherArr.map(({ data, date }, i) => {
        return (
          <div
            key={i}
            className="bg-white rounded-md border border-gray-200 mb-8"
          >
            <h2 className="flex justify-between text-xl sm:text-2xl p-4 font-serif bg-sky-50">
              <span className="">
                {formatIsoDate(date).weekday === today
                  ? "Today"
                  : formatIsoDate(date).weekday}
              </span>
              <span className="text-gray-500 font-thin">
                {formatIsoDate(date).month_day}
              </span>
            </h2>
            <ul>
              {data.map(({ dt, weather, main }, i) => {
                return (
                  <li
                    key={i}
                    className="flex flex-row items-center border-t border-t-gray-200 px-2 sm:px-4"
                  >
                    <span className="text-lg sm:text-xl">
                      {formatDate(dt, "h aa")}
                    </span>

                    <p className="text-center text-gray-700 font-thin text-sm sm:text-lg capitalize ml-4">
                      {weather[0].description}
                    </p>

                    <div className="ml-auto flex items-center text-lg sm:text-xl">
                      <p>{(Math.round(main.temp * 100) / 100).toFixed(0)}°</p>
                      <img
                        className="w-12 h-12 sm:w-16 sm:h-16 ml-auto"
                        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                        alt={weather[0].icon}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
