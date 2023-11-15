import { Link } from "react-router-dom";
import unleashLogo from '../../images/unleash-logo.png';

function Header() {
  return (
    <div className="header bg-gray-700 p-5 flex flex-wrap justify-around drop-shadow-xl animate-fade animate-duration-[1000ms]">
      <img 
        className="pet-card-img w-1/6" 
        src={unleashLogo} 
        alt="Unleash Logo"
      />
      <nav className="flex items-end gap-4 text-xl text-white">
        <Link to="pets/1" className="hover:underline cursor-pointer hover:text-green-200 transition duration-300 ease-in-out">
          Home
        </Link>
      </nav>

    </div>
  )
}

export default Header;