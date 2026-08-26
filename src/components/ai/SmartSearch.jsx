import { Search, Sparkles, X, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLazySmartSearchQuery } from "../../features/ai/aiApiSlice";
import VideoCard from "../home/VideoCard";
import VideoCardShimmer from "../shimmer/VideoCardShimmer";

const SmartSearch = () => {
    const [smartSearch, { isLoading, isFetching, isError, error }] =
        useLazySmartSearchQuery();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);

    const loading = isLoading || isFetching;

    const submitHandler = async (e) => {
        e.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery || loading) return;

        try {
            const result = await smartSearch({
                smartQuery: trimmedQuery,
            }).unwrap();

            console.log("Smart search result", result);

            setResults(result?.data || result || []);
        } catch (err) {
            console.log("Smart search error", err);
            setResults([]);
        }
    };

    const clearSearch = () => {
        setQuery("");
    };

    const getErrorMessage = () => {
        const status = error?.status;
        // console.log("Error we got", error)

        if (status === 429) {
            return "Smart Search is temporarily rate limited. Please try again in a little while.";
        }

        if (status === 413) {
            return "The Smart Search request was too large. Please try a shorter search.";
        }

        if (status === 403) {
            return "Smart Search quota has been reached. Please try again later.";
        }

        return "Something went wrong while processing your search.";
    };

    return (
        <section className="w-full px-3 md:px-6">
            <div className="w-full max-w-6xl mx-auto">

                {/* Description */}
                {!results?.length && !loading && !isError && (
                    <div className="text-center mb-6">
                        <p className="text-sm md:text-base text-gray-400">
                            Find the best videos for what you're actually
                            looking for with Promptly Smart Search.
                        </p>
                    </div>
                )}

                {/* Search */}
                <form
                    onSubmit={submitHandler}
                    className="flex items-center w-full max-w-5xl mx-auto bg-gray-900 border border-gray-500 rounded-full p-1.5 focus-within:border-primary transition-colors"
                >
                    <Search
                        size={21}
                        className="ml-3 mr-2 text-gray-400 shrink-0"
                    />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What do you want to learn or find?"
                        className="flex-1 min-w-0 bg-transparent text-white placeholder:text-gray-500 outline-none border-none px-1 py-2.5 text-sm md:text-base"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="p-2 text-gray-400 hover:text-white cursor-pointer rounded-full transition"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={!query.trim() || loading}
                        className="shrink-0 bg-primary text-white rounded-full px-4 md:px-6 py-2.5 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition cursor-pointer flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={17} className="animate-spin" />
                                Searching
                            </>
                        ) : (
                            <>
                                <Sparkles size={17} />
                                Search
                            </>
                        )}
                    </button>
                </form>

                {/* ================= LOADING ================= */}
                {loading && (
                    <section className="mt-6 md:mt-10">
                        <div className="flex items-center justify-center gap-2 mb-6 text-gray-300">
                            <Loader2
                                size={22}
                                className="animate-spin text-primary"
                            />
                            <span>
                                AI is finding the best videos for you...
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <VideoCardShimmer key={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= ERROR ================= */}
                {!loading && isError && (
                    <section className="mt-6 md:mt-10 flex justify-center">
                        <div className="w-full max-w-2xl rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">

                            <div className="flex justify-center mb-3">
                                <div className="p-3 rounded-full bg-red-500/10">
                                    <AlertCircle
                                        size={28}
                                        className="text-red-400"
                                    />
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold text-white">
                                Smart Search couldn't complete
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                {getErrorMessage()}
                            </p>

                            <button
                                onClick={submitHandler}
                                disabled={!query.trim()}
                                className="mt-5 bg-primary text-white rounded-full px-5 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
                            >
                                Try Again
                            </button>
                        </div>
                    </section>
                )}

                {/* ================= RESULTS ================= */}
                {!loading &&
                    !isError &&
                    results &&
                    results.length > 0 && (
                        <section className="mt-6 md:mt-10">

                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles
                                    size={20}
                                    className="text-primary"
                                />

                                <h2 className="text-xl font-semibold text-white">
                                    Best matches for you
                                </h2>

                                <span className="text-sm text-gray-500">
                                    ({results.length})
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {results.map((video) => (
                                    <VideoCard
                                        key={video.id}
                                        object={video}
                                        mode="smartSearch"
                                        smartResult={video}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                {/* ================= NO RESULTS ================= */}
                {!loading &&
                    !isError &&
                    results &&
                    results.length === 0 && (
                        <section className="mt-6 md:mt-10 text-center">
                            <p className="text-gray-400">
                                No suitable videos were found for this query.
                            </p>
                        </section>
                    )}

                {/* ================= SUGGESTIONS ================= */}
                {!loading &&
                    !isError &&
                    !results && (
                        <div className="flex flex-col items-center justify-center gap-2 mt-20 md:mt-10">
                            {[
                                "Best React authentication tutorial",
                                "DSA interview preparation",
                                "Best system design videos",
                                "Learn Node.js from scratch",
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => setQuery(suggestion)}
                                    className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-300 hover:border-primary hover:text-white transition cursor-pointer"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}
            </div>
        </section>
    );
};

export default SmartSearch;