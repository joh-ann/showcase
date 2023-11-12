import { useState } from "react";
import Autocomplete from "./Autocomplete";

const validAnimalTypes = ["dog", "cat"];

function PetFinderForm({ onSearch }) {
  const [animalType, setAnimalType] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Animal Type:", animalType);
    console.log("Valid Animal Types:", validAnimalTypes);

    if (!animalType.trim() && !location.trim()) {
      setError("Please enter both animal type and location");
      return;
    }

    if (!animalType || !validAnimalTypes.includes(animalType.trim().toLowerCase())) {
      setError("Please enter a valid animal type");
      return;
    }

    if (!location.trim()) {
      setError("Please enter a valid location");
      return;
    }

    setError("");
    onSearch({ animalType, location });
  };


  return (
    <form className="container mx-auto h-1/6 flex justify-center items-center">
      <div className="md:w-1/3 m-1">
        <input 
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm" 
          id="inline-type"
          type="text" 
          placeholder="Search Dog or Cat"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        />
      </div>
      <div className="md:w-1/4 mr-1">
      <Autocomplete
          id="inline-location"
          type="text"
          onSelect={(selectedLocation) => setLocation(selectedLocation)}
        />
      </div>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <button 
        className="shadow bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm" 
        type="button"
        onClick={handleSearch}
        >
        Search
      </button>
    </form>
  )
}

export default PetFinderForm;