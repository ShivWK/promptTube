import { Search, Sparkles, X } from "lucide-react";
import { useState } from "react";

const SmartSearch = () => {
    const [query, setQuery] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) return;

        // TODO:
        // 1. Call YouTube search API
        // 2. Rank results locally
        // 3. Enrich top candidates
        // 4. Send candidates to AI
        // 5. Display final recommendations

        console.log("Smart search:", trimmedQuery);
    };

    const clearSearch = () => {
        setQuery("");
    };

    return (
        <section className="w-full px-3 md:px-6 ">
            <div className="w-full max-w-5xl mx-auto">

                <div className="text-center mb-6">
                    <p className="text-sm md:text-base text-gray-400">
                        Find the best videos for what you're actually looking for with Promptly Smart Search.
                    </p>
                </div>

                {/* Search */}

                <form
                    onSubmit={submitHandler}
                    className="flex items-center w-full bg-gray-900 border border-gray-500 rounded-full p-1.5 focus-within:border-primary transition-colors"
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
                        className=" flex-1 min-w-0 bg-transparent text-white placeholder:text-gray-500 outline-none border-none px-1 py-2.5 text-sm md:text-base"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="not-even:p-2 not-even: text-gray-400 not-even: hover:text-white not-even:cursor-pointer not-even:rounded-full not-even:transition"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={!query.trim()}
                        className=" shrink-0 bg-primary text-white rounded-full px-4 md:px-6 py-2.5 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition cursor-pointer"
                    >
                        Search
                    </button>
                </form>

                {/* Example searches */}

                <div className="flex flex-col items-center justify-center gap-2 mt-18 md:mt-10">
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
                            className=" rounded-full border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-300 hover:border-primary hover:text-white transition cursor-pointer"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SmartSearch;