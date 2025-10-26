import { useRef, useState } from "react";
import { Search, X, LoaderCircle } from "lucide-react";
import debounceCreater from "../../../utils/debounceCreater";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSuggestions,
  setSearchSuggestions,
  selectSuggestionsLoading,
  setSearchSuggestionsLoading
} from "../../../features/home/homeSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const isSmall = window.innerWidth <= 768;
  const dataFetcher = useRef(debounceCreater(getSuggestions, 150));
  const searchSuggestion = useSelector(selectSuggestions);
  const suggestionsLoading = useSelector(selectSuggestionsLoading);
  const dispatch = useDispatch();

  async function getSuggestions(str) {
    dispatch(setSearchSuggestionsLoading(true));
    try {
      const response = await fetch(`https://prompttube.onrender.com/api/v1/youtube/searchSuggestion?query=${encodeURIComponent(str)}`);
      const data = await response.json();

      dispatch(setSearchSuggestions(data.data));
    } catch (err) {
      console.log("failed", err)
    }

    dispatch(setSearchSuggestionsLoading(false));
  }

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
    dataFetcher.current(search.trim());
  }

  const searchClickHandler = () => {
    if (suggestionsLoading) return;
  }

  const cancelSearchClickHandler = () => {
    if (suggestionsLoading) return;
    setSearch("");
    dispatch(setSearchSuggestions([]))
  }

  const suggestionClickHandler = (suggestion) => {
    setSearch(suggestion);
    dispatch(setSearchSuggestions([]));
  }

  return (
    <div className="relative">
      <div className="flex rounded-4xl overflow-hidden border-2 dark:border-gray-700">
        <input value={search} onChange={inputChangeHandler} type="text" name={`no-autofill-${Math.random()}`}className="outline-none py-1 lg:py-2 text-lg px-5 dark:text-gray-200 dark:bg-gray-900 placeholder:text-gray-400 w-full lg:w-[35rem]" placeholder="Search" autoCapitalize="new-password" />
        <button onClick={searchSuggestion.length !== 0 ? cancelSearchClickHandler : searchClickHandler} className={`lg:py-2 p-2 lg:px-4 dark:bg-gray-700 cursor-pointer ${!suggestionsLoading && "active:bg-gray-400"}`}>
          {suggestionsLoading
            ? <LoaderCircle size={isSmall ? 20 : 25} className="dark:text-white animate-spin" />
            : <Search size={isSmall ? 20 : 25} className="dark:text-white" />
          }
        </button>
      </div>

      <div className="rounded-b-xl overflow-hidden absolute dark:bg-gray-700 w-[92%] top-full left-1/2 -translate-x-1/2 dark:text-gray-200 z-80 h-fit">
        <ul className=" max-h-[22rem] lg:max-h-[29rem] overflow-y-auto pretty-scrollbar">
          {searchSuggestion.length !== 0 && searchSuggestion.map((text, index) => <li key={index} onClick={() => suggestionClickHandler(text)} className="py-2 px-3 hover:cursor-pointer hover:text-gray-800 hover:bg-gray-300 active:bg-gray-300 active:text-gray-800">{text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;

// searchSuggestion.length !== 0
//               ? <X size={isSmall ? 20 : 25} className="dark:text-white" />
//               : <Search size={isSmall ? 20 : 25} className="dark:text-white" />