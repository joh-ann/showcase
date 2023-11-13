import { Link } from "react-router-dom";
import unleashLogo from '../../images/unleash-logo.png';

function Header() {
  return (
    <div className="header bg-gray-700 p-5 flex justify-between drop-shadow-xl">
      <img 
        className="pet-card-img w-1/6 ml-20 mr-10" 
        src={unleashLogo} 
        alt="Unleash Logo"
      />
      <nav className="flex items-end gap-4 text-xl text-white mr-20">
        <Link to="/" className="hover:underline cursor-pointer hover:text-green-200 transition duration-300 ease-in-out">
          Home
        </Link>
        <Link to="pets/1" className="hover:underline cursor-pointer hover:text-green-200 transition duration-300 ease-in-out">
          Adopt
        </Link>
        <Link to="/missing" className="hover:underline cursor-pointer hover:text-green-200 transition duration-300 ease-in-out">
          Missing
        </Link>
        <Link to="/events" className="hover:underline cursor-pointer hover:text-green-200 transition duration-300 ease-in-out">
          Events
        </Link>
      </nav>

    </div>
  )
}

export default Header;