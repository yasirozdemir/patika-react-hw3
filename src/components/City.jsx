import { useWeather } from "../context/WeatherContext";
import DailyForecast from "./DailyForecast";
import WeeklyForecast from "./WeeklyForecast";

const City = () => {
  const { cityDetails } = useWeather();

  return (
    <section className="min-w-[320px] max-w-[700px] px-2 mx-0 sm:px-0 sm:mx-auto">
      {cityDetails ? (
        <h1 className="text-4xl pb-6 text-center font-thin">
          {cityDetails.name}
        </h1>
      ) : (
        <div>City Details Are Not Available</div>
      )}

      <DailyForecast />

      <WeeklyForecast />
    </section>
  );
};

export default City;
