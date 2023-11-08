import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App/App";

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
        console.log(json.animals);
        setResults(json.animals);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPets();
  }, [accessToken]);

  if (results === null) return null;

  return (
    <div>
      {results.map((pet) => (
        <div key={pet.id}>
          <h3>{pet.name}</h3>
          {pet.photos && pet.photos[0] && pet.photos[0].full && (
            <img src={pet.photos[0].full} alt={pet.name} />
          )}
        </div>
      ))}
    </div>
  );
}

export default PetFinder;
