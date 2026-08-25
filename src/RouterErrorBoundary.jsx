import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

const RouterErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleRetry = () => {
        window.location.reload();
    };

    const isDevelopment = import.meta.env.DEV;

    let errorMessage = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        errorMessage = `${error.status}: ${error.statusText}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-10">
            <section className="w-full max-w-2xl text-center">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle
                            size={42}
                            className="text-red-400"
                            strokeWidth={1.7}
                        />
                    </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold tracking-wide mb-3">
                    Something went wrong
                </h1>

                <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                    PromptTube ran into an unexpected error. Don't worry,
                    your data is safe. Try refreshing the page or go back
                    to the home page.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

                    <button
                        onClick={handleRetry}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                        <RefreshCw size={18} />
                        Try Again
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-gray-200 font-medium hover:bg-gray-800 active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                        <Home size={18} />
                        Go Home
                    </button>

                </div>

                {isDevelopment && (
                    <details className="mt-8 text-left bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <summary className="px-4 py-3 text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                            Show error details
                        </summary>

                        <div className="border-t border-gray-800 p-4">
                            <p className="text-red-400 text-sm font-medium mb-3">
                                {errorMessage}
                            </p>

                            <pre className="text-xs text-gray-500 whitespace-pre-wrap overflow-auto max-h-72">
                                {error?.stack}
                            </pre>
                        </div>
                    </details>
                )}

            </section>
        </main>
    );
};

export default RouterErrorBoundary;