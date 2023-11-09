import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App/App";
import PetFinderForm from "../PetFinderForm/PetFinderForm";
import { useParams, Link } from "react-router-dom";

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

  if (results === null) return null;

  return (
    <div className="pet-finder h-screen">
      <PetFinderForm />
      <div className="flex justify-center">
        <div className="container flex flex-wrap justify-center gap-2">
          {results.map((pet) => (
            <div className="pet-card md:w-1/2 lg:w-1/4 p-4" key={pet.id}>
              {pet.photos && pet.photos[0] && pet.photos[0].full && (
                <img className="pet-card-img w-full h-72 object-cover" 
                src={pet.photos[0].full} 
                alt={pet.name} 
                />
                )}
                <div className="pet-card-info flex flex-col items-center text-sm w-full">
                  <h3>{pet.name} · {pet.gender[0]}</h3>
                  <div className="text-xs">{pet.age} · {pet.breeds.primary}</div>
                </div>
            </div>
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
