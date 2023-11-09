function Header() {
  return (
    <div className="header bg-purple-700 p-5 flex justify-between">
      <div className="logo">
        <h1 className="text-xl font-bold text-white">Unleash</h1>
      </div>
      <nav className="flex space-x-8 text-white">
        <h2 className="hover:underline cursor-pointer">Home</h2>
        <h2 className="hover:underline cursor-pointer">Adopt</h2>
        <h2 className="hover:underline cursor-pointer">Missing</h2>
        <h2 className="hover:underline cursor-pointer">Events</h2>
      </nav>

    </div>
  )
}

export default Header;