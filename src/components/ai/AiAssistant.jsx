import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Send,
    Sparkles,
} from "lucide-react";
import AiMessage from "./AiMessage";

const predefinedQuestions = [
    "Explain in simple words",
    "Give key takeaways",
    "Quiz me",
    "Important interview questions",
];

const AIAssistant = () => {
    const [open, setOpen] = useState(false);
    const [askOpen, setAskOpen] = useState(false);
    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            type: "welcome",
            text:
                "👋 AI Assistant is ready.\n\nGenerate a summary, key takeaways or ask anything about this video.",
        },
    ]);

    const [summaryGenerated, setSummaryGenerated] = useState(false);
    const [keyPointsGenerated, setKeyPointsGenerated] = useState(false);

    const generateSummary = () => {
        setSummaryGenerated(true);

        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                type: "summary",
                text:
                    "React Query (TanStack Query) is a powerful data-fetching library that simplifies server state management. It provides caching, background refetching, automatic retries, pagination support, optimistic updates, and excellent developer experience. The video explains why React Query is preferred over manually handling loading and error states with useEffect.",
            },
        ]);
    };

    const generateKeyTakeaways = () => {
        setKeyPointsGenerated(true);

        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                type: "keypoints",
                points: [
                    "Server state is different from client state.",
                    "Automatic caching improves performance.",
                    "Background refetch keeps data fresh.",
                    "Supports infinite scrolling and pagination.",
                    "Mutations make updating server data easier.",
                ],
            },
        ]);
    };

    return (
        <aside
            className={`
        w-full
        md:flex-1
        rounded-xl
        overflow-hidden
        bg-gray-800
        border
        border-gray-700
        flex
        flex-col
        ${open
                    ? "h-[32rem] md:h-[42rem]"
                    : "h-auto md:h-[3.6rem]"
                }
    `}
        >
            {/* Header */}

            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-700 cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <Sparkles
                        size={20}
                        className="text-primary"
                    />

                    <h2 className="font-semibold text-white">
                        AI Assistant
                    </h2>
                </div>

                {open ? (
                    <ChevronUp className="text-gray-300" />
                ) : (
                    <ChevronDown className="text-gray-300" />
                )}
            </button>

            {open && (
                <>
                    {/* Messages */}

                    <div className="flex-1 overflow-y-auto pretty-scrollbar p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <AiMessage
                                key={index}
                                role={msg.role}
                            >
                                {msg.type === "keypoints" ? (
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Key Takeaways
                                        </h3>

                                        <ul className="list-disc ml-5 space-y-2">
                                            {msg.points.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </AiMessage>
                        ))}
                    </div>

                    {/* Summary */}

                    {!summaryGenerated && (
                        <div className="border-t border-gray-700 p-4">
                            <button
                                onClick={generateSummary}
                                className="w-full rounded-lg bg-primary py-2 text-white font-medium hover:opacity-90 transition cursor-pointer"
                            >
                                Generate AI Summary
                            </button>
                        </div>
                    )}

                    {/* Key Points */}

                    {!keyPointsGenerated && (
                        <div className="px-4 pb-4">
                            <button
                                onClick={generateKeyTakeaways}
                                className="w-full rounded-lg bg-gray-900 py-2 text-gray-200 font-medium hover:bg-gray-700 transition cursor-pointer"
                            >
                                Generate Key Takeaways
                            </button>
                        </div>
                    )}

                    {/* Suggested Questions */}

                    <div className="px-4 py-4">
                        <h3 className="text-sm text-gray-400 mb-2">
                            Suggested Questions
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            {predefinedQuestions.map((item) => (
                                <button
                                    key={item}
                                    className="
                                        rounded-full
                                        border
                                        border-gray-600
                                        px-3
                                        py-1.5
                                        text-sm
                                        text-gray-200
                                        hover:bg-primary
                                        hover:border-primary
                                        transition
                                    "
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ask */}

                    <div className="border-t border-gray-700 p-4">
                        {!askOpen ? (
                            <button
                                onClick={() => setAskOpen(true)}
                                className="w-full rounded-lg bg-gray-900 py-2 text-gray-200 hover:bg-gray-700"
                            >
                                Ask AI
                            </button>
                        ) : (
                            <form className="flex gap-2">
                                <input
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                    placeholder="Ask about this video..."
                                    className="
                                        flex-1
                                        rounded-full
                                        bg-gray-900
                                        px-4
                                        py-2
                                        text-white
                                        outline-none
                                        border
                                        border-gray-700
                                        focus:border-primary
                                    "
                                />

                                <button
                                    className="
                                        rounded-full
                                        bg-primary
                                        p-3
                                        text-white
                                        hover:opacity-90
                                    "
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        )}
                    </div>
                </>
            )}
        </aside>
    );
};

export default AIAssistant;