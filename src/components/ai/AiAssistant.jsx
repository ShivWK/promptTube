import { useState, useRef, useEffect } from "react";
import {
    ChevronDown,
    ChevronUp,
    Send,
    Sparkles,
} from "lucide-react";

import AiMessage from "./AiMessage";
import DotBounceLoader from "../common/DotBounceLoader";
import { useSearchParams } from "react-router-dom";
import { useLazyGetSummaryQuery, useLazyGetTranscriptionQuery, useLazyGetKeyTakeawaysQuery, useLazyAskQuestionQuery } from "../../features/ai/aiApiSlice";
import AIMessage from "./AiMessage";

const AIAssistant = () => {
    const [getTranscription, {
        data: transcription,
        isLoading,
        isFetching
    }] = useLazyGetTranscriptionQuery();

    const transcriptionLoading = isLoading || isFetching;

    const [getSummary, {
        data: summary,
        isLoading: loadingSummary,
        isFetching: fetchingSummary }] = useLazyGetSummaryQuery();

    const summaryLoading = loadingSummary || fetchingSummary;

    const [getKeyTakeaways, {
        data: keyTakeaways,
        isLoading: loadingKeyTakeaways,
        isFetching: fetchingKeyTakeaways }] = useLazyGetKeyTakeawaysQuery()

    const keyTakeawaysLoading = loadingKeyTakeaways || fetchingKeyTakeaways;

    const [getAnswer, {
        isLoading: loadingAnswer,
        isFetching: fetchingAnswer }] = useLazyAskQuestionQuery();

    const answerLoading = loadingAnswer || fetchingAnswer;

    const [searchParam] = useSearchParams();
    const videoId = searchParam.get("id");

    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [transcript, setTranscript] = useState("");

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

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight

        if (distanceFromBottom < 150) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages])

    const generateSummary = async () => {
        if (summary || summaryLoading) return;

        try {
            const summaryData = await getSummary({ videoId, transcript }).unwrap();

            setSummaryGenerated(true);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    type: "summary",
                    title: summaryData.data.title,
                    text: summaryData.data.summary,
                },
            ]);
        } catch (err) {
            console.log("summary generation failed", err);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    type: "error",
                    text: "Sorry, I couldn't generate the summary right now. Please try again.",
                },
            ]);
        }
    };

    const generateKeyTakeaways = async () => {
        if (keyTakeaways || keyTakeawaysLoading) return;

        try {
            const keyTakeawaysData = await getKeyTakeaways({
                videoId,
                transcript
            }).unwrap();

            setKeyPointsGenerated(true);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    type: "keypoints",
                    points: keyTakeawaysData.data,
                },
            ]);

        } catch (error) {
            console.error("Key takeaways generation failed:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    type: "error",
                    text: "Sorry, I couldn't generate the key takeaways right now. Please try again.",
                },
            ]);
        }
    };

    const handleDropdownClick = async () => {
        if (!open && !transcription) {
            try {
                const result = await getTranscription({ videoId }).unwrap();
                setTranscript(result.transcript);
            } catch (err) {
                console.error(err);
            }
        }

        setOpen(prev => !prev);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const userQuestion = question.trim()
        if (!userQuestion || answerLoading) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: userQuestion,
            },
        ]);

        setQuestion("");

        try {
            const aiAnswer = await getAnswer({
                transcript,
                question: userQuestion,
            }).unwrap();

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: aiAnswer?.data?.answer,
                },
            ]);

        } catch (error) {
            console.error("AI question failed:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    type: "error",
                    text: "Sorry, I couldn't answer that question right now. Please try again.",
                },
            ]);
        }
    }

    return (
        <aside
            className={`w-full md:flex-1 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex flex-col ${open ? "h-[36rem] md:h-[42rem]" : "h-auto md:h-[3.6rem]"}`}
        >
            {/* Header */}

            <button
                onClick={handleDropdownClick}
                className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-700 cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <Sparkles
                        size={20}
                        className="text-primary"
                    />

                    <h2 className="font-semibold text-white">AI Assistant</h2>
                    {transcriptionLoading && (
                        <span className="ml-1 -mb-1">
                            <DotBounceLoader
                                nmSize="md:text-xl"
                                mdSize="text-2xl"
                                allColor="text-primary"
                            />
                        </span>
                    )}
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

                    <div
                        ref={containerRef}
                        className="flex-1 overflow-y-auto pretty-scrollbar p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <AiMessage
                                key={index}
                                role={msg.role}
                            >
                                {msg.type === "keypoints" ? (
                                    <div>
                                        <h3 className="font-semibold mb-2">Key Takeaways</h3>

                                        <ul className="list-disc ml-5 space-y-2">
                                            {msg.points.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : msg.type === "summary" ? (
                                    <div>
                                        <h3 className="font-semibold mb-2">{msg.title}</h3>

                                        <p>
                                            {msg.text}
                                        </p>
                                    </div>
                                ) : msg.type === "error" ? (
                                    <p className="text-red-400">
                                        {msg.text}
                                    </p>
                                ) : (
                                    msg.text
                                )}
                            </AiMessage>
                        ))}
                        {(loadingAnswer || fetchingAnswer)
                            && <AIMessage key="loader" role="assistant">
                                <span>
                                    <DotBounceLoader
                                        nmSize="md:text-xl"
                                        mdSize="text-2xl"
                                        allColor="text-primary"
                                    />
                                </span>
                            </AIMessage>}
                    </div>

                    {/* Summary */}

                    {(!summaryGenerated || !summary) && (
                        <div className="border-t border-gray-700 p-4">
                            <button
                                onClick={generateSummary}
                                disabled={loadingSummary || fetchingSummary}
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-2 text-white font-medium hover:opacity-90 transition cursor-pointer"
                            >
                                <span>Generate AI Summary</span>
                                {(loadingSummary || fetchingSummary) && <span className="h-5 w-5 border-3 border-b-transparent border-r-white border-l-white border-t-white rounded-full animate-spin" />}
                            </button>
                        </div>
                    )}

                    {/* Key Points */}

                    {!keyPointsGenerated && (
                        <div className="px-4 pb-4">
                            <button
                                onClick={generateKeyTakeaways}
                                disabled={loadingKeyTakeaways || fetchingKeyTakeaways}
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 py-2 text-gray-200 font-medium hover:bg-gray-700 transition cursor-pointer"
                            >
                                <span>Generate Key Takeaways</span>
                                {(loadingKeyTakeaways || fetchingKeyTakeaways) && <span className="h-5 w-5 border-3 border-b-transparent border-r-white border-l-white border-t-white rounded-full animate-spin" />}
                            </button>
                        </div>
                    )}

                    {/* Ask */}

                    <div className="border-t border-gray-700 p-4">
                            <form className="flex gap-2" onSubmit={submitHandler}>
                                <input
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                    placeholder="Ask about this video..."
                                    className="flex-1 rounded-full bg-gray-900 px-4 py-2 text-white outline-none border border-gray-700 focus:border-primary"
                                />

                                <button
                                    disabled={loadingAnswer || fetchingAnswer}
                                    className="rounded-full bg-primary p-3 text-white hover:opacity-90">
                                    <Send size={18} />
                                </button>
                            </form>
                    </div>
                </>
            )}
        </aside>
    );
};

export default AIAssistant;