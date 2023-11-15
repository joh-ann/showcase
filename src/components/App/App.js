import { useEffect, createContext, useState } from "react";
import React from 'react';
import PetFinder from "../PetFinder/PetFinder";
import Header from "../Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetInfo from "../PetInfo/PetInfo";
import Unleash from "../Unleash/Unleash";

export const AuthContext = createContext();
const petFinderKey = "omptVnMU1LaKPqLkg8CMiXVdi9DI2P3sEoz7XIpSqdGGR1Ledc";
const petFinderSecret = "DQ9XrfsnAWju3P9VoeQ8GiwAbCG3oNdxSO7ejuWf";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

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
          setError("Failed to obtain access token");
          return;
        }

        const data = await petfinderRes.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("An error occurred while fetching the access token:", error);
        setError("An error occurred while fetching the access token");
      }
    }

    fetchAccessToken();
  }, []);

  function NotFound() {
    const imageUrl = `https://http.dog/404.jpg`
    return (
      <div className="not-found flex flex-col justify-center items-center p-10 text-2xl">
        <h1 className="mb-10">Page Not Found</h1>
        <img src={imageUrl} alt="Page Not Found" className="not-found-hound w-1/2 h-auto"/>
      </div>
  )}

  return (
    <AuthContext.Provider value={accessToken}>
      <Router>
        <Header />
        {error && <div>Error: {error}</div>}
        <Routes>
          <Route 
          path="/" 
          element={<PetFinder />} 
          />
          <Route 
          path="/pets/:page" 
          element={<PetFinder />} 
          />
          <Route 
          path="/pets/:page/:petId" 
          element={<PetInfo />}
          />
          <Route 
          path="*" 
          element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
