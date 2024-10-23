import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
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

  return (
    <form className="flex flex-col" onSubmit={handleSearch}>
      <label htmlFor="search" className="text-center text-gray-800 my-2">
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
        className="w-full text-xl rounded-md border border-gray-200 pl-2 py-1 font-thin outline-gray-800"
      />
    </form>
  );
};

export default SearchBar;
