import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App/App";
import PetFinderForm from "../PetFinderForm/PetFinderForm";

function PetFinder() {
  const [results, setResults] = useState(null);
  const accessToken = useContext(AuthContext);

  useEffect(() => {
    if (accessToken === null) return;

    const fetchPets = async () => {
      try {
        const petResults = await fetch("https://api.petfinder.com/v2/animals", {
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
  }, [accessToken]);

  if (results === null) return null;

  return (
    <div className="pet-finder h-screen">
      <PetFinderForm />
      <div className="flex justify-center">
        <div className="container flex flex-wrap">
          {results.map((pet) => (
            <div className="pet-card w-1/4 p-4" key={pet.id}>
              {pet.photos && pet.photos[0] && pet.photos[0].full && (
                <img src={pet.photos[0].full} alt={pet.name} />
                )}
                <h3>{pet.name}</h3>
                <h3>{pet.gender}</h3>
                <h3>{pet.colors.primary}{pet.breeds.primary}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="page-btns flex justify-end mx-auto w-3/4">
        <button class="shadow bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm m-2" type="button">
          Previous
        </button>
        <button class="shadow bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm m-2" type="button">
          Next
        </button>
      </div>
    </div>
  );
}

export default PetFinder;
