import { Bot, User } from "lucide-react";

const AIMessage = ({ role, children }) => {
    const isUser = role === "user";

    return (
        <div
            className={`flex gap-3 ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            {!isUser && (
                <div className="h-9 w-9 shrink-0 rounded-full bg-primary flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                </div>
            )}

            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap break-words ${
                    isUser
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-gray-900 text-gray-200 rounded-bl-md"
                }`}
            >
                {children}
            </div>

            {isUser && (
                <div className="h-9 w-9 shrink-0 rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={18} className="text-white" />
                </div>
            )}
        </div>
    );
};

export default AIMessage;