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

    const typedLocation = document.querySelector("#inline-location").value || location.trim();
    console.log("Typed Location:", typedLocation)

    setError("");

    const hasNumber = /\d/.test(typedLocation);

    if (hasNumber) {
      onSearch({ animalType, location: location });
    } else {
      onSearch({ animalType, location: typedLocation });
    }

    setLocation("");
    setAnimalType("");
    document.querySelector("#inline-location").value = "";
  };


  return (
    <div className="mx-auto flex items-center justify-center flex-col p-10">
    <form className="container mx-auto flex justify-center items-center">
      <div className="md:w-1/6 mr-2">
        <input 
          className="bg-white appearance-none border-2 border-white rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500 text-sm shadow-md" 
          id="inline-type"
          type="text" 
          placeholder="Search Dog or Cat"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        />
      </div>
      <div className="md:w-1/6 mr-1">
      <Autocomplete
          id="inline-location"
          type="text"
          value={location}
          onSelect={(selectedLocation) => setLocation(selectedLocation)}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button 
        className="search-btn shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-green-500 text-white font-bold py-3 px-4 rounded text-sm ml-2" 
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