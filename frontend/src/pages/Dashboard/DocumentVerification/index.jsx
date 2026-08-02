import { API_BASE_URL } from "../../../config";
import { useEffect, useState } from "react";
import { isAuthError, handleAdminAuthError } from "../../../utils/adminAuth";
import "./DocumentVerification.css";

const TABS = [
    { key: "pending", label: "Pending" },
    { key: "verified", label: "Verified" },
    { key: "rejected", label: "Rejected" },
    { key: "all", label: "All" },
];

function DocumentVerification() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("pending");
    const [rejectingId, setRejectingId] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const authHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem("access")}`,
    });

    const fetchDocuments = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${API_BASE_URL}/api/properties/documents/`, {
                headers: authHeaders(),
            });
            if (isAuthError(res.status)) {
                handleAdminAuthError();
                return;
            }
            if (!res.ok) throw new Error("Failed to load documents");
            const data = await res.json();
            setDocuments(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load documents. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const updateStatus = async (id, payload) => {
        await fetch(`${API_BASE_URL}/api/properties/documents/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeaders(),
            },
            body: JSON.stringify(payload),
        });
        setRejectingId(null);
        setRejectReason("");
        fetchDocuments();
    };

    const handleVerify = (id) => updateStatus(id, { status: "verified", rejection_reason: "" });

    const handleRejectSubmit = (id) => {
        if (!rejectReason.trim()) return;
        updateStatus(id, { status: "rejected", rejection_reason: rejectReason.trim() });
    };

    if (loading) return <h2 className="dv-status">Loading documents...</h2>;
    if (error) return <h2 className="dv-status dv-error">{error}</h2>;

    const filtered = activeTab === "all" ? documents : documents.filter((d) => d.status === activeTab);

    return (
        <div className="dv-page">
            <div className="dv-header">
                <div>
                    <h2>Document Verification</h2>
                    <p>Review property documents uploaded through Sell inquiries and admin uploads.</p>
                </div>
            </div>

            <div className="dv-tabs">
                {TABS.map((tab) => {
                    const count = tab.key === "all"
                        ? documents.length
                        : documents.filter((d) => d.status === tab.key).length;
                    return (
                        <button
                            key={tab.key}
                            className={`dv-tab ${activeTab === tab.key ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label} <span className="dv-count">{count}</span>
                        </button>
                    );
                })}
            </div>

            {filtered.length === 0 ? (
                <div className="dv-empty">No documents in this category.</div>
            ) : (
                <div className="dv-cards">
                    {filtered.map((doc) => (
                        <div className="dv-card" key={doc.id}>
                            <div className="dv-card-info">
                                <h4>{doc.property_title || `Property #${doc.Property}`}</h4>
                                <a href={doc.document} target="_blank" rel="noopener noreferrer">
                                    View Document
                                </a>
                                <p className="dv-meta">
                                    Uploaded {new Date(doc.uploaded_at).toLocaleString()}
                                </p>
                                {doc.status !== "pending" && doc.verified_by_username && (
                                    <p className="dv-meta">
                                        {doc.status === "verified" ? "Verified" : "Rejected"} by{" "}
                                        {doc.verified_by_username} on{" "}
                                        {doc.verified_at ? new Date(doc.verified_at).toLocaleString() : "—"}
                                    </p>
                                )}
                                {doc.status === "rejected" && doc.rejection_reason && (
                                    <p className="dv-rejection-reason">Reason: {doc.rejection_reason}</p>
                                )}
                            </div>

                            <div className="dv-card-side">
                                <span className={`dv-badge dv-badge-${doc.status}`}>{doc.status}</span>

                                {rejectingId === doc.id ? (
                                    <div className="dv-reject-form">
                                        <input
                                            type="text"
                                            placeholder="Reason for rejection..."
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                        />
                                        <div className="dv-reject-actions">
                                            <button
                                                className="dv-btn dv-btn-reject"
                                                onClick={() => handleRejectSubmit(doc.id)}
                                            >
                                                Confirm Reject
                                            </button>
                                            <button
                                                className="dv-btn dv-btn-cancel"
                                                onClick={() => {
                                                    setRejectingId(null);
                                                    setRejectReason("");
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="dv-card-actions">
                                        {doc.status !== "verified" && (
                                            <button
                                                className="dv-btn dv-btn-verify"
                                                onClick={() => handleVerify(doc.id)}
                                            >
                                                Verify
                                            </button>
                                        )}
                                        {doc.status !== "rejected" && (
                                            <button
                                                className="dv-btn dv-btn-reject"
                                                onClick={() => setRejectingId(doc.id)}
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DocumentVerification;
