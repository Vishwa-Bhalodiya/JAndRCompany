import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import { isAuthenticated } from "../../services/auth";
import { isAuthError, handleAdminAuthError } from "../../utils/adminAuth";
import "./ChatWidget.css";

function ChatWidget() {
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [sessionId, setSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, open]);

    const handleToggle = () => {
        if (!isAuthenticated()) {
            navigate("/login", {
                state: {
                    from: location.pathname + location.search,
                    message: "Please log in to chat with us.",
                },
            });
            return;
        }
        setOpen((v) => !v);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || loading) return;

        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setInput("");
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_BASE_URL}/api/chat/send/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
                body: JSON.stringify({ message: text, session_id: sessionId }),
            });

            if (isAuthError(res.status)) {
                handleAdminAuthError();
                return;
            }

            if (!res.ok) {
                throw new Error("Chat request failed");
            }

            const data = await res.json();
            setSessionId(data.session_id);
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-widget">
            {open && (
                <div className="chat-widget-panel">
                    <div className="chat-widget-header">
                        <span>Chat with us</span>
                        <button className="chat-widget-close" onClick={() => setOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chat-widget-messages">
                        {messages.length === 0 && (
                            <div className="chat-widget-empty">
                                Ask us anything about buying, selling, renting, or our other services.
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                                {m.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-bubble chat-bubble-assistant chat-bubble-loading">
                                Typing...
                            </div>
                        )}
                        {error && <div className="chat-widget-error">{error}</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-widget-input-row" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !input.trim()}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}

            <button className="chat-widget-toggle" onClick={handleToggle}>
                {open ? <FaTimes /> : <FaCommentDots />}
            </button>
        </div>
    );
}

export default ChatWidget;
