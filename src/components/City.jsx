import { useWeather } from "../context/WeatherContext";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";

const City = () => {
  const { cityDetails } = useWeather();

  return (
    <section className="min-w-[320px] sm:min-w-[600px] px-2 mx-0 sm:px-0 sm:mx-auto">
      <SearchBar />
      {cityDetails ? (
        <h1 className="text-4xl sm:text-6xl text-center font-thin mb-8 text-sky-800">
          {cityDetails.name}
        </h1>
      ) : (
        <div>City Details Are Not Available</div>
      )}
      <Forecast />
    </section>
  );
};

export default City;
