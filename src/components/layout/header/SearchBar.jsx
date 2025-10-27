import { useRef, useState } from "react";
import { Search, X, LoaderCircle } from "lucide-react";
import debounceCreater from "../../../utils/debounceCreater";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectSuggestions,
  setSearchSuggestions,
  selectSuggestionsLoading,
  setSearchSuggestionsLoading,
  setSearchResult,
  setSearchLoading,
  selectIsSmall
} from "../../../features/home/homeSlice";

import { useLazyGetSearchVideosQuery } from "../../../features/home/homeApiSlice";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dataFetcher = useRef(debounceCreater(getSuggestions, 100));
  const searchSuggestion = useSelector(selectSuggestions);
  const suggestionsLoading = useSelector(selectSuggestionsLoading);
  const isSmall = useSelector(selectIsSmall);
  const [trigger, { isLoading }] = useLazyGetSearchVideosQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getSuggestions(str) {
    dispatch(setSearchSuggestionsLoading(true));

    try {
      const response = await fetch(`https://prompttube.onrender.com/api/v1/youtube/searchSuggestion?query=${encodeURIComponent(str)}`);
      const data = await response.json();
      dispatch(setSearchSuggestions(data.data));
    } catch (err) {
      console.log("failed", err)
    } finally {
      dispatch(setSearchSuggestionsLoading(false));
    }
  }

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
    dataFetcher.current(search.trim());
  }

  const searchClickHandler = async (text) => {
    if (suggestionsLoading || isLoading) return;
    dispatch(setSearchLoading(true));

    try {
      const data = await trigger({ searchedTerm: text }).unwrap();
      console.log(data.items)
      dispatch(setSearchResult(data.items));
    } catch (err) {
      console.log("Failed to search", err)
    } finally {
      dispatch(setSearchLoading(false))
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
    if (!isSmall) navigate("/pc_search")
  }

  const searchButtonClickHandler = () => {
    if (!isSmall) navigate("/pc_search");
    searchClickHandler(search.trim());
  }

  return (
    <div className="relative">
      <div className="flex rounded-4xl overflow-hidden border-2 dark:border-gray-700">
        <input value={search} onChange={inputChangeHandler} type="text" name={`no-autofill-${Math.random()}`} className="outline-none py-1 lg:py-2 text-lg pl-5 pr-2 dark:text-gray-200 dark:bg-gray-900 placeholder:text-gray-400 w-full lg:w-[35rem]" placeholder="Search" autoCapitalize="new-password" />
        {
          search && <button onClick={cancelSearchClickHandler} className="bg-gray-900 cursor-pointer px-1">
            <X size={isSmall ? 20 : 25} className="dark:text-white" />
          </button>
        }
        <button onClick={searchButtonClickHandler} className={`lg:py-2 p-2 lg:px-4 dark:bg-gray-700 cursor-pointer ${(!suggestionsLoading && !isLoading) && "active:bg-gray-400"}`}>
          {(suggestionsLoading || isLoading)
            ? <LoaderCircle size={isSmall ? 20 : 25} className="dark:text-white animate-spin" />
            : <Search size={isSmall ? 20 : 25} className="dark:text-white" />
          }
        </button>
      </div>

      <div className="absolute rounded-b-xl overflow-hidden dark:bg-gray-700 w-[92%] top-full left-1/2 -translate-x-1/2 dark:text-gray-200 z-80 h-fit">
        <ul className="max-h-[22rem] lg:max-h-[29rem] overflow-y-auto pretty-scrollbar">
          {searchSuggestion.length !== 0 && searchSuggestion.map((text, index) => <li key={index} onClick={() => suggestionClickHandler(text)} className="group flex items-center gap-2 py-2 px-3 hover:cursor-pointer hover:text-gray-800 hover:bg-gray-300 active:bg-primary active:text-white">
            <Search size={isSmall ? 15 : 20} className="dark:text-white group-hover:text-gray-800" />
            <span>{text}</span>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;

