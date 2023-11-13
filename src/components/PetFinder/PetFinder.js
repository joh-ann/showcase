import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App/App";
import PetFinderForm from "../PetFinderForm/PetFinderForm";
import { useParams, Link } from "react-router-dom";
import noImage from "../../images/no-img.png";

function PetFinder() {
  const [results, setResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = useContext(AuthContext);
  const { page } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken === null) return;

    const fetchPets = async () => {
      try {
        const petResults = await fetch(`https://api.petfinder.com/v2/animals?page=${page || currentPage}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!petResults.ok) {
          console.error("Error fetching pets");
          return;
        }
        const json = await petResults.json();
        console.log("animals", json.animals);
        setResults(json.animals);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPets();
  }, [accessToken, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = async ({ animalType, location }) => {
    if (!animalType || !location) {
      console.error("Both animalType and location are required for search");
      return;
    }

    try {
      const searchResults = await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&location=${location}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (!searchResults.ok) {
        console.error("Error fetching search results");
        setError("No pets found in the area");
        setResults([]);
        return;
      }

      const json = await searchResults.json();

      if (!json.animals || json.animals.length === 0) {
        setError("No search results found");
        setResults([]);
        return;
      }

      setResults(json.animals);
      setError(null);

    } catch (error) {
      console.error("An error occured during search:", error);
      setError("An error occured during search");
      setResults([]);
    }
  }

  if (results === null) return null;

  return (
    <div className="pet-finder h-full bg-green-50">
      <PetFinderForm onSearch={handleSearch}/>
      <div className="flex justify-center">
        <div className="container flex flex-wrap justify-center gap-6">
          {results.map((pet) => (
            <Link 
              className="pet-card md:w-1/2 lg:w-1/4 bg-gray-600 rounded-2xl shadow-lg hover:brightness-110" 
              key={`${currentPage}-${pet.id}`}
              to={`/pets/${currentPage}/${pet.id}`}
              id={pet.id}
            >
                {pet.photos && pet.photos.length > 0 && pet.photos[0].full && (
                  <img 
                    className="pet-card-img w-full h-72 object-cover rounded-t-xl" 
                    src={pet.photos[0].full} 
                    alt={pet.name} 
                  />
                ) || (
                  <img 
                    className="pet-card-img w-full h-72 object-cover rounded-t-xl" 
                    src={noImage} 
                    alt={pet.name} 
                  />
                )}
                <div className="pet-card-info flex flex-col items-center text-md w-full p-2 text-white">
                  <h3>{pet.name} · {pet.gender[0]}</h3>
                  <div className="text-xs">{pet.contact.address.city}, {pet.contact.address.state}</div>
                  <div className="text-xs">{pet.age} · {pet.breeds.primary}</div>
                </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="page-btns flex justify-end mx-auto w-3/4 p-4">
        {currentPage > 1 && (
        <Link to={`/pets/${currentPage - 1}`} 
          className="previous-btn shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 rounded text-md m-2" 
          onClick={handlePreviousPage}
          >
          Previous
        </Link>
        )}
        <Link to={`/pets/${currentPage + 1}`} 
          className="next-btn shadow bg-green-700 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 rounded text-md m-2" 
          onClick={handleNextPage}
          >
          Next
        </Link>
      </div>
      {error && (
        <div className="error-message text-red-500 mt-4">
          {error}
        </div>
      )}
    </div>
  );
}

export default PetFinder;
