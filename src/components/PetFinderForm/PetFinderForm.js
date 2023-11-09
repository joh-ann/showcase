function PetFinderForm() {
  return (
    <form className="container mx-auto h-1/6 flex justify-center items-center">
      <div class="md:w-1/3 m-1">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm" id="inline-full-name" type="text" placeholder="Search Bulldog, Kitten, etc."/>
      </div>
      <div class="md:w-1/4 mr-1">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm" id="inline-password" type="text" placeholder="Enter City, State, or ZIP"/>
      </div>
      <button class="shadow bg-purple-700 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded text-sm" type="button">
        Search
      </button>
    </form>
  )
}

export default PetFinderForm;