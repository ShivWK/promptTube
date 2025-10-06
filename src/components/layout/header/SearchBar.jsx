import { Search } from "lucide-react"

const SearchBar = () => {
    const isSmall = window.innerWidth <= 768;

  return (
    <div className="flex rounded-4xl overflow-hidden border-2 dark:border-gray-700">
        <input type="text" name="search_bar" className="outline-none py-1 lg:py-3 px-5 dark:text-gray-200 text-2xl dark:bg-gray-900 placeholder:text-gray-600 w-24 lg:w-[35rem] max-md:hidden" placeholder="Search"/>
        <button className="lg:py-2 p-1 lg:px-4 dark:bg-gray-700">
            <Search size={ isSmall ? 19 : 30} className="dark:text-white e"/>
        </button>
    </div>
  )
}

export default SearchBar