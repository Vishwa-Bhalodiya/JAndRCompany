import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaMapMarkerAlt,
    FaFileAlt
} from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import "./TrackSubmission.css";

function TrackSubmission() {
    const [searchParams] = useSearchParams();
    const [refId, setRefId] = useState(searchParams.get("id") || "");
    const [mobileNo, setMobileNo] = useState(searchParams.get("mobile_no") || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!refId.trim() || !mobileNo.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await axios.get(`${API_BASE_URL}/api/services/sell/track/`, {
                params: { id: refId.trim(), mobile_no: mobileNo.trim() }
            });
            setResult(res.data);
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.detail ||
                "No matching submission found. Check your reference ID and mobile number."
            );
        } finally {
            setLoading(false);
        }
    };

    const docStatusIcon = (status) => {
        if (status === "verified") return <FaCheckCircle className="ts-doc-verified" />;
        if (status === "rejected") return <FaTimesCircle className="ts-doc-rejected" />;
        return <FaClock className="ts-doc-pending" />;
    };

    return (
        <section className="track-submission-page">
            <div className="container">
                <div className="ts-header">
                    <h1>Track Your Submission</h1>
                    <p>Enter your reference ID and mobile number to check your property's verification status.</p>
                </div>

                <div className="ts-card">
                    <form className="ts-form" onSubmit={handleSubmit}>
                        <div className="ts-field">
                            <label>Reference ID</label>
                            <input
                                type="text"
                                placeholder="e.g. 42"
                                value={refId}
                                onChange={(e) => setRefId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="ts-field">
                            <label>Mobile No.</label>
                            <input
                                type="text"
                                placeholder="Enter the mobile number you submitted with"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="ts-submit-btn" disabled={loading}>
                            {loading ? "Checking..." : "Check Status"}
                        </button>
                    </form>

                    {error && <div className="ts-error">{error}</div>}

                    {result && (
                        <div className="ts-result">
                            <div className={`ts-status-banner ${result.is_published ? "ts-live" : "ts-pending"}`}>
                                {result.is_published ? (
                                    <>
                                        <FaCheckCircle />
                                        <span>Great news — your property is live and visible to buyers/renters!</span>
                                    </>
                                ) : (
                                    <>
                                        <FaClock />
                                        <span>Your property is still under review.</span>
                                    </>
                                )}
                            </div>

                            {result.property_title && (
                                <p className="ts-property-title">{result.property_title}</p>
                            )}

                            <div className="ts-checklist">
                                <div className={`ts-check-item ${result.has_location ? "done" : ""}`}>
                                    <FaMapMarkerAlt />
                                    <span>Map location {result.has_location ? "added" : "pending"}</span>
                                </div>
                                <div className={`ts-check-item ${result.documents.length > 0 && result.documents.every(d => d.status === "verified") ? "done" : ""}`}>
                                    <FaFileAlt />
                                    <span>
                                        Documents verified ({result.documents.filter(d => d.status === "verified").length}/{result.documents.length})
                                    </span>
                                </div>
                            </div>

                            {result.documents.length > 0 && (
                                <div className="ts-documents">
                                    <h4>Document Status</h4>
                                    {result.documents.map((doc, i) => (
                                        <div className="ts-document-row" key={doc.id}>
                                            {docStatusIcon(doc.status)}
                                            <span>Document {i + 1}</span>
                                            <span className={`ts-doc-status-label ts-${doc.status}`}>{doc.status}</span>
                                            {doc.status === "rejected" && doc.rejection_reason && (
                                                <span className="ts-doc-reason">Reason: {doc.rejection_reason}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TrackSubmission;
