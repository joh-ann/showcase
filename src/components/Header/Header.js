import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header bg-gray-700 p-5 flex justify-between drop-shadow-xl">
      <div className="logo">
        <h1 className="text-3xl font-bold text-white">Unleash</h1>
      </div>
      <nav className="flex items-end gap-4 text-lg text-white mr-10">
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