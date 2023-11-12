import { useEffect } from "react";
import PropTypes from 'prop-types';

const Autocomplete = ({ onSelect }) => {
  useEffect(() => {
    const loadAutocomplete = () => {
      const input = document.getElementById("inline-location");
      
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps API is not loaded.");
        return;
      }
      
      const options = {
        componentRestrictions: { country: ["us", "ca"] },
        fields: ["address_components", "formatted_address", "geometry", "name"],
      };
      const autocomplete = new window.google.maps.places.Autocomplete(input, options);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected Place:", place);

        let formattedLocation;

        if (place.address_components && place.address_components.length > 0) {
          const hasNumber = /\d/.test(place.name || place.formatted_address);
          
          if (hasNumber) {
            formattedLocation = place.name || place.formatted_address;
          } else {
            const city = place.address_components.find(component =>
              component.types.includes("locality")
            );
            const state = place.address_components.find(component =>
              component.types.includes("administrative_area_level_1")
            );

            if (city && state) {
              formattedLocation = `${city.long_name}, ${state.short_name}`;
            } else {
              formattedLocation = place.formatted_address;
            }
          }
        } else {
          formattedLocation = place.formatted_address;
        }

        onSelect(formattedLocation);
        console.log(formattedLocation);
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

Autocomplete.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default Autocomplete;
