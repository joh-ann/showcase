import { useState } from "react";

function PetFinderForm({ onSearch }) {
  const [animalType, setAnimalType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch({ animalType, location })
  }

  return (
    <form className="container mx-auto h-1/6 flex justify-center items-center">
      <div className="md:w-1/3 m-1">
        <input 
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm" 
          id="inline-type"
          type="text" 
          placeholder="Search Bulldog, Kitten, etc."
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}
        />
      </div>
      <div className="md:w-1/4 mr-1">
        <input 
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm" 
          id="inline-location" 
          type="text" 
          placeholder="Enter City, State, or ZIP"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
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