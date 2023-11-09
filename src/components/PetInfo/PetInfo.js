import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App/App";
import { useParams } from "react-router-dom";

function PetInfo() {
  const { petId } = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const accessToken = useContext(AuthContext);

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await fetch(`https://api.petfinder.com/v2/animals/${petId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
        });
        if (!response.ok) {
          console.error("Error fetching pet info");
          return;
        }
        const data = await response.json();
        setPetInfo(data.animal);
      } catch (error) {
        console.error("An error occurred while fetching pet info:", error);
      }
    };

    fetchPetInfo();
  }, [petId])

  if (!petInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{petInfo.name}</h2>
    </div>
  );
};

export default PetInfo;