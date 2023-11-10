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
        setCurrentPage(1);
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
        return;
      }
      const json = await searchResults.json();
      console.log("search results", json.animals);
      setResults(json.animals);
    } catch (error) {
      console.error("An error occured during search:", error);
    }
  }

  if (results === null) return null;

  return (
    <div className="pet-finder h-screen">
      <PetFinderForm onSearch={handleSearch}/>
      <div className="flex justify-center">
        <div className="container flex flex-wrap justify-center gap-2">
          {results.map((pet) => (
            <Link 
              className="pet-card md:w-1/2 lg:w-1/4" 
              key={pet.id}
              to={`/pets/${currentPage}/${pet.id}`}
            >
                {pet.photos && pet.photos.length > 0 && pet.photos[0].full && (
                  <img 
                    className="pet-card-img w-full h-72 object-cover" 
                    src={pet.photos[0].full} 
                    alt={pet.name} 
                  />
                ) || (
                  <img 
                    className="pet-card-img w-full h-72 object-cover" 
                    src={noImage} 
                    alt={pet.name} 
                  />
                )}
                <div className="pet-card-info flex flex-col items-center text-sm w-full">
                  <h3>{pet.name} · {pet.gender[0]}</h3>
                  <div className="text-xs">{pet.contact.address.city}, {pet.contact.address.state}</div>
                  <div className="text-xs">{pet.age} · {pet.breeds.primary}</div>
                </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="page-btns flex justify-end mx-auto w-3/4">
        {currentPage > 1 && (
        <Link to={`/pets/${currentPage - 1}`} 
          className="shadow bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm m-2" 
          type="button"
          onClick={handlePreviousPage}
          >
          Previous
        </Link>
        )}
        <Link to={`/pets/${currentPage + 1}`} 
          className="shadow bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm m-2" 
          type="button"
          onClick={handleNextPage}
          >
          Next
        </Link>
      </div>
    </div>
  );
}

export default PetFinder;
