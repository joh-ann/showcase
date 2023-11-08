import { useEffect, createContext, useState } from "react";
import React from 'react';
import PetFinder from "../PetFinder/PetFinder";

export const AuthContext = createContext();
const petFinderKey = "V5As7LiojQosrFnALOipEPaRImeA0H9j2ni72LR57G9dZpwLzs";
const petFinderSecret = "vDsiC97A8DHg9ooui5nD1dUiF0nNbwj9jk8Qz3VP";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      params.append("client_id", petFinderKey);
      params.append("client_secret", petFinderSecret);

      try {
        const petfinderRes = await fetch("https://api.petfinder.com/v2/oauth2/token", {
          method: "POST",
          body: params
        });

        if (!petfinderRes.ok) {
          console.error("Failed to obtain access token");
          return;
        }

        const data = await petfinderRes.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("An error occurred while fetching the access token:", error);
      }
    }

    fetchAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={accessToken}>
      <PetFinder />
    </AuthContext.Provider>
  );
}

export default App;