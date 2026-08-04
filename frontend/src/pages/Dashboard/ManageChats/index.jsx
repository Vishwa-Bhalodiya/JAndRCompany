import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
import { isAuthError, handleAdminAuthError } from "../../../utils/adminAuth";
import "./ManageChats.css";

function ManageChats() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(null);
    const [detail, setDetail] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const authHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem("access")}`,
    });

    const fetchSessions = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${API_BASE_URL}/api/chat/sessions/`, {
                headers: authHeaders(),
            });
            if (isAuthError(res.status)) {
                handleAdminAuthError();
                return;
            }
            if (!res.ok) throw new Error("Failed to load chat sessions");
            const data = await res.json();
            setSessions(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load chat sessions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const openSession = async (id) => {
        setSelected(id);
        setDetail(null);
        setDetailLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/chat/sessions/${id}/`, {
                headers: authHeaders(),
            });
            if (isAuthError(res.status)) {
                handleAdminAuthError();
                return;
            }
            const data = await res.json();
            setDetail(data);
        } catch (err) {
            console.error(err);
        } finally {
            setDetailLoading(false);
        }
    };

    if (loading) return <h2 className="mc-status">Loading customer chats...</h2>;
    if (error) return <h2 className="mc-status mc-error">{error}</h2>;

    return (
        <div className="mc-page">
            <div className="mc-header">
                <h2>Customer Chats</h2>
                <p>Every conversation customers have had with the support chatbot.</p>
            </div>

            <div className="mc-layout">
                <div className="mc-list">
                    {sessions.length === 0 ? (
                        <div className="mc-empty">No chat sessions yet.</div>
                    ) : (
                        sessions.map((s) => (
                            <button
                                key={s.id}
                                className={`mc-list-item ${selected === s.id ? "active" : ""}`}
                                onClick={() => openSession(s.id)}
                            >
                                <div className="mc-list-item-top">
                                    <span className="mc-list-user">{s.username || s.email || "Unknown"}</span>
                                    <span className="mc-list-count">{s.message_count}</span>
                                </div>
                                <div className="mc-list-preview">{s.last_message || "(no messages)"}</div>
                                <div className="mc-list-time">{new Date(s.updated_at).toLocaleString()}</div>
                            </button>
                        ))
                    )}
                </div>

                <div className="mc-transcript">
                    {!selected && <div className="mc-empty">Select a conversation to view the transcript.</div>}
                    {selected && detailLoading && <div className="mc-empty">Loading transcript...</div>}
                    {selected && detail && (
                        <>
                            <h3 className="mc-transcript-title">
                                {detail.username || detail.email} &middot; {detail.email}
                            </h3>
                            <div className="mc-transcript-messages">
                                {detail.messages.map((m) => (
                                    <div key={m.id} className={`mc-bubble mc-bubble-${m.role}`}>
                                        <div className="mc-bubble-meta">
                                            {m.role === "user" ? "Customer" : "Bot"} &middot;{" "}
                                            {new Date(m.created_at).toLocaleString()}
                                        </div>
                                        <div className="mc-bubble-content">{m.content}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageChats;
