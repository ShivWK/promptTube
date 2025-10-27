import { useEffect, useRef, useState } from "react";
import { Search, X, LoaderCircle } from "lucide-react";
import debounceCreater from "../../../utils/debounceCreater";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSuggestions,
  setSearchSuggestions,
  selectSuggestionsLoading,
  setSearchSuggestionsLoading,
  setSearchResult,
  selectSearchResult,
} from "../../../features/home/homeSlice";

import { useLazyGetSearchVideosQuery } from "../../../features/home/homeApiSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [doSearch, setDoSearch] = useState(true)
  const isSmall = window.innerWidth <= 768;
  const dataFetcher = useRef(debounceCreater(getSuggestions, 150));
  const searchSuggestion = useSelector(selectSuggestions);
  const suggestionsLoading = useSelector(selectSuggestionsLoading);
  const searchResult = useSelector(selectSearchResult);
  const [trigger, { isLoading }] = useLazyGetSearchVideosQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length !== 0 && searchResult.length !== 0) {
      setDoSearch(false);
    } else {
      setDoSearch(true);
    }
  }, [searchResult, search])

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

  const searchClickHandler = async (text) => {
    if (suggestionsLoading || isLoading) return;

    try {
      const data = await trigger({ searchedTerm: text }).unwrap();
      dispatch(setSearchResult(data.items));
    } catch (err) {
      console.log("Failed to search", err)
    }
  }

  const cancelSearchClickHandler = () => {
    if (suggestionsLoading) return;
    setSearch("");
    dispatch(setSearchSuggestions([]))
  }

  const suggestionClickHandler = (suggestion) => {
    setSearch(suggestion);
    dispatch(setSearchSuggestions([]));
    searchClickHandler(suggestion.trim());
  }

  const searchButtonClickHandler = (text) => {
    if (doSearch) {
      searchClickHandler(search.trim());
    } else cancelSearchClickHandler();
  }

  return (
    <div className="relative">
      <div className="flex rounded-4xl overflow-hidden border-2 dark:border-gray-700">
        <input value={search} onChange={inputChangeHandler} type="text" name={`no-autofill-${Math.random()}`} className="outline-none py-1 lg:py-2 text-lg px-5 dark:text-gray-200 dark:bg-gray-900 placeholder:text-gray-400 w-full lg:w-[35rem]" placeholder="Search" autoCapitalize="new-password" />
        <button onClick={() => searchButtonClickHandler(search.trim())} className={`lg:py-2 p-2 lg:px-4 dark:bg-gray-700 cursor-pointer ${(!suggestionsLoading && !isLoading) && "active:bg-gray-400"}`}>
          {(suggestionsLoading || isLoading)
            ? <LoaderCircle size={isSmall ? 20 : 25} className="dark:text-white animate-spin" />
            : !doSearch
              ? <X size={isSmall ? 20 : 25} className="dark:text-white" />
              : <Search size={isSmall ? 20 : 25} className="dark:text-white" />
          }
        </button>
      </div>

      <div className="rounded-b-xl overflow-hidden absolute dark:bg-gray-700 w-[92%] top-full left-1/2 -translate-x-1/2 dark:text-gray-200 z-80 h-fit">
        <ul className=" max-h-[22rem] lg:max-h-[29rem] overflow-y-auto pretty-scrollbar">
          {searchSuggestion.length !== 0 && searchSuggestion.map((text, index) => <li key={index} onClick={() => suggestionClickHandler(text)} className="py-2 px-3 hover:cursor-pointer hover:text-gray-800 hover:bg-gray-300 active:bg-primary active:text-white">{text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;

