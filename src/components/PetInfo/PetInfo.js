import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App/App";
import { useParams } from "react-router-dom";
import noImage from "../../images/no-img.png";

function PetInfo() {
  const { petId } = useParams();
  const [petInfo, setPetInfo] = useState(null);
  const accessToken = useContext(AuthContext);

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        if (!petId) {
          return;
        }
  
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
        console.log(data)
      } catch (error) {
        console.error("An error occurred while fetching pet info:", error);
      }
    };
  
    fetchPetInfo();
  }, [petId, accessToken]);
  
  if (!petInfo) {
    return <div>Loading...</div>;
  }

  const handleViewOnPetFinder = () => {
    window.location.href = petInfo.url;
  };

  return (
    <div className="flex flex-col">
      {petInfo.photos && petInfo.photos.length > 0 && petInfo.photos[0].full && (
        <img 
          className="pet-info-img w-1/4 flex self-center mt-5 rounded-t-2xl"
          src={petInfo.photos[0].full}
          alt={petInfo.name} 
          id={petInfo.id}
          />
      ) || (
          <img 
            className="w-1/4 flex self-center mt-5 rounded-t-2xl" 
            src={noImage} 
            alt={petInfo.name} 
          />
          )}
          <div className="pet-info-wrapper bg-green-200 flex flex-col self-center w-1/4 rounded-b-2xl p-1 pb-4">
            <div className="pet-info self-center text-lg font-semibold text-center">{petInfo.name}</div>
            <div className="pet-info self-center text-sm text-center">{petInfo.age} · {petInfo.gender} · {petInfo.size}</div>
            <div className="pet-info self-center text-sm text-center">{petInfo.breeds.primary} · {petInfo.contact.address.city}, {petInfo.contact.address.state}</div>
          </div>
        <div className="container flex self-center flex-row">
          <div className="pet-info w-1/2 p-2">
            <h2 className="text-xl font-semibold">About</h2>
              <div className="flex flex-col">
                <p>Characteristics</p>
                <p className="flex flex-row text-sm">{petInfo.tags && petInfo.tags.join(", ")}</p>
                <p>Coat Length</p>
                <p className="flex flex-row text-sm">{petInfo.coat}</p>
                <p>House-Trained</p>
                <p className="flex flex-row text-sm">{petInfo.attributes.house_trained ? "Yes" : "No"}</p>
                <p>Health</p>
                <p className="flex flex-row text-sm">{petInfo.attributes.shots_current ? "Vaccinations up to date" : "Needs Vaccinations"}, {petInfo.attributes.spayed_neutered ? "spayed/neutered" : "Not spayed/neutered"}</p>
              </div>
            </div>
            <div className="pet-intro w-1/2 p-2">
              <h2 className="text-xl font-semibold">Meet {petInfo.name}</h2>
              <p>{petInfo.description}</p>
              <div className="flex justify-end p-2">
                <button 
                  className="petfinder-btn bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={handleViewOnPetFinder}
                  >
                  View on PetFinder
                </button>
              </div>
            </div>
        </div>
      </div>
  );
};

export default PetInfo;