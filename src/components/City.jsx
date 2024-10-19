import { useWeather } from "../context/WeatherContext";
import DailyForecast from "./DailyForecast";
import WeeklyForecast from "./WeeklyForecast";

const City = () => {
  const { cityDetails } = useWeather();

  return (
    <section>
      <h1>{cityDetails?.name}</h1>
      <ol id="daily">
        <DailyForecast />
      </ol>
      <ol id="weekly">
        <WeeklyForecast />
      </ol>
    </section>
  );
};

export default City;
