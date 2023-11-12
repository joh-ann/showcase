import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header bg-gray-200 p-5 flex justify-between">
      <div className="logo">
        <h1 className="text-3xl font-bold text-gray-800">Unleash</h1>
      </div>
      <nav className="flex items-end space-x-8 text-lg text-gray-800">
        <Link to="/" className="hover:underline cursor-pointer">
          Home
        </Link>
        <Link to="pets/1" className="hover:underline cursor-pointer">
          Adopt
        </Link>
        <Link to="/missing" className="hover:underline cursor-pointer">
          Missing
        </Link>
        <Link to="/events" className="hover:underline cursor-pointer">
          Events
        </Link>
      </nav>

    </div>
  )
}

export default Header;