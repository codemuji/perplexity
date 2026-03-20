import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import "./dashboard.css";

const chatHistory = [
  "AI Trends 2024",
  "Project Brainstorming",
  "Code Refactoring",
  "Data Analysis",
];





const AsteriskIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path
      d="M12 3v18M4.5 7.5l15 9M4.5 16.5l15-9"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
    />
  </svg>
);

const PaperclipIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path
      d="M21 12.3 12.9 20.4a5.5 5.5 0 1 1-7.8-7.8L14 3.8a3.5 3.5 0 1 1 5 5l-9.2 9.2a1.5 1.5 0 1 1-2.1-2.1l8.5-8.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path
      d="M12 15a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm0 0v3m-4-7a4 4 0 0 0 8 0m-9 9h10"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path
      d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const Dashboard = () => {
  const chat = useChat();
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  
  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      chat.handleSendMessage({ message, chatId: currentChatId });
      setMessage("");
    }
  };

  return (
    <main className="dashboard-light-shell min-h-screen w-full p-4 md:p-8">
      <div className="dashboard-light-grid mx-auto flex h-[calc(100vh-2rem)] w-full max-w-6xl gap-6 md:gap-8 lg:h-[min(768px,calc(100vh-4rem))]">
        <aside className="dashboard-sidebar-light flex w-64 flex-shrink-0 flex-col rounded-[20px] border border-slate-200 p-8">
          <div className="mb-8 flex items-center gap-3 px-2 text-slate-700">
            <AsteriskIcon />
            <h1 className="text-[17px] font-medium tracking-tight">Perplexity</h1>
          </div>

          <nav className="flex flex-col gap-2">
            {chatHistory.map((title) => (
              <button
                key={title}
                className="history-chip w-full rounded-full px-5 py-3 text-left text-[15px] text-slate-700 transition-colors"
                type="button"
              >
                {title}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 text-xs text-slate-500">{user?.username || user?.email || "Guest user"}</div>
        </aside>

        <section className="dashboard-main-light relative flex flex-1 flex-col overflow-hidden rounded-[20px] border border-slate-200">
          <div className="chat-scroll flex-1 overflow-y-auto p-8 pb-36 md:p-12 md:pb-36">
            <div className="space-y-5">
              {chats[currentChatId]?.messages.map((message) => (
                <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      message.role === "user"
                        ? "user-message-bubble max-w-[82%] rounded-2xl rounded-tr-md px-5 py-3.5 text-[15px] leading-relaxed text-slate-800"
                        : "max-w-[82%] rounded-2xl rounded-tl-md bg-white px-5 py-3.5 text-[15px] leading-relaxed text-slate-800 shadow-[0_6px_14px_rgba(148,163,184,0.14)] border border-slate-100"
                    }
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="input-gradient absolute bottom-0 left-0 w-full p-6">
            <form onSubmit={handleSendMessage} className="mx-auto w-full max-w-4xl">
              <div className="chat-input-wrap flex items-center rounded-full border border-slate-200 p-2 pl-6">
                <input
                  className="flex-1 border-none bg-transparent py-3 text-[15px] text-slate-700 placeholder:text-slate-500 focus:outline-none"
                  placeholder="Type your message..."
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <div className="flex items-center gap-1 pr-1">
                  <button
                    aria-label="Send message"
                    className="send-message-btn ml-1 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors"
                    type="submit"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );

};

export default Dashboard;
