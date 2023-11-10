import React, { useEffect } from "react";

const Autocomplete = ({ onSelect }) => {
  useEffect(() => {
    const loadAutocomplete = () => {
      const input = document.getElementById("inline-location");
      const options = {
        componentRestrictions: { country: ["us", "ca"] },
        fields: ["formatted_address", "geometry", "name",],
      };
      const autocomplete = new window.google.maps.places.Autocomplete(input, options);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected Place:", place);
        onSelect(place.name);
      });
    };

    loadAutocomplete();
  }, [onSelect]);

  return (
    <div>
      <input 
      id="inline-location" 
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm" 
      type="text"
      placeholder="Enter City, State or ZIP" />
    </div>
  );
};

export default Autocomplete;
