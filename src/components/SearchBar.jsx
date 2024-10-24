import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const { city_name: city } = useParams();
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    if (value !== "") {
      const editedInput = "/" + value.replace(" ", "%20");
      navigate(editedInput, { replace: true });
      e.preventDefault();
    } else {
      alert("You should insert a city name!");
    }
  };

  const setCurrentLoc = () => {
    navigate("/current", { replace: true });
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

      {city !== "current" && (
        <button id="current" className={_ClassList} onClick={setCurrentLoc}>
          Show weather forecast for my current location
        </button>
      )}
    </div>
  );
};

export default SearchBar;
