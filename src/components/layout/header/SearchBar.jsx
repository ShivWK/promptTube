import { useRef, useState } from "react";
import { Search, X} from "lucide-react";
import debounceCreater from "../../../utils/debounceCreater";
import { useSelector, useDispatch } from "react-redux";
import { selectSuggestions, setSearchSuggestions } from "../../../features/home/homeSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const isSmall = window.innerWidth <= 768;
  const dataFetcher = useRef(debounceCreater(getSuggestions, 200));
  const searchSuggestion = useSelector(selectSuggestions);
  const dispatch = useDispatch();

  async function getSuggestions(str) {
    try {
      const response = await fetch(`https://prompttube.onrender.com/api/v1/youtube/searchSuggestion?query=${encodeURIComponent(str)}`);
      const data = await response.json();

      dispatch(setSearchSuggestions(data.data));
    } catch (err) {
      console.log("failed", err)
    }
  }

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
  }

  const searchClickHandler = () => {
    dataFetcher.current(search.trim());
  }

  const cancelSearchClickHandler = () => {
    setSearch("");
    dispatch(setSearchSuggestions([]))
  }

  return (
    <div className="relative">
      <div className="flex rounded-4xl overflow-hidden border-2 dark:border-gray-700">
        <input value={search} onChange={inputChangeHandler} type="text" name="search_bar" className="outline-none py-1 lg:py-2 px-5 dark:text-gray-200  dark:bg-gray-900 placeholder:text-gray-400 w-full lg:w-[35rem]" placeholder="Search" />
        <button onClick={searchSuggestion.length !== 0 ? cancelSearchClickHandler : searchClickHandler} className="lg:py-2 p-2 lg:px-4 dark:bg-gray-700 cursor-pointer active:bg-gray-400">
          {
            searchSuggestion.length !== 0
              ? <X size={isSmall ? 20 : 25} className="dark:text-white e" />
              : <Search size={isSmall ? 20 : 25} className="dark:text-white e" />
          }
        </button>
      </div>

      <div className="rounded-b-xl overflow-hidden absolute dark:bg-gray-700 w-[92%] top-full left-1/2 -translate-x-1/2 dark:text-gray-200 z-80 h-fit">
        <ul className=" max-h-[22rem] lg:max-h-[29rem] overflow-y-auto pretty-scrollbar">
          {searchSuggestion.length !== 0 && searchSuggestion.map(text => <li className="py-2 px-3 hover:cursor-pointer hover:text-gray-800 hover:bg-gray-300">{text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;