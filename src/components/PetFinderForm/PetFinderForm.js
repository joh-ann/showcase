import { useState } from "react";
import Autocomplete from "./Autocomplete";
import PropTypes from 'prop-types';

const validAnimalTypes = ["dog", "cat"];

function PetFinderForm({ onSearch }) {
  const [animalType, setAnimalType] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Animal Type:", animalType);
    console.log("Valid Animal Types:", validAnimalTypes);
    console.log("Location:", location);

    if (!animalType.trim() && !location.trim()) {
      setError("Please enter both animal type and location");
      return;
    }

    if (!animalType || !validAnimalTypes.includes(animalType.trim().toLowerCase())) {
      setError("Please enter a valid animal type");
      return;
    }

    if (!location.trim() && !document.querySelector("#inline-location").value) {
      setError("Please enter a valid location");
      return;
    }

    const selectedLocation = document.querySelector("#inline-location").value || location.trim();
    console.log("Typed Location:", selectedLocation)

    setError("");
    onSearch({ animalType, location: selectedLocation });
  };


  return (
    <div className="mx-auto flex items-center justify-center flex-col h-1/6">
    <form className="container mx-auto flex justify-center items-center">
      <div className="md:w-1/3 m-1">
        <input 
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 text-sm" 
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
          value={location}
          onSelect={(selectedLocation) => setLocation(selectedLocation)}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button 
        className="search-btn shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm" 
        type="button"
        onClick={handleSearch}
        >
        Search
      </button>
    </form>
      {error && <p className="error-message text-red-500 text-sm italic">{error}</p>}
      </div>
  )
}

PetFinderForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default PetFinderForm;