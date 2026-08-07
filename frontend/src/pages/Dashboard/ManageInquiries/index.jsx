import { API_BASE_URL, ANYROR_PORTAL_URL } from "../../../config";
import { useEffect, useState } from "react";
import { isAuthError, handleAdminAuthError } from "../../../utils/adminAuth";
import "./ManageInquiries.css";

const ENDPOINTS = {
    sell: "services/sell",
    buyRent: "services/buy-rent",
    measurement: "services/measurement",
    landDocumentation: "services/land-documentation",
    legalCourt: "services/legal-court",
    governmentLand: "services/government-land",
    naService: "services/na-service",
    investment: "services/investment",
    propertyAlert: "services/property-alert",
    landFinance: "services/land-finance",
    inquiries: "inquiries",
};

const SECTIONS = [
    { key: "sell", label: "Sell Inquiries", dataKey: "sell" },
    { key: "buy", label: "Buy Inquiries", dataKey: "buyRent", filter: (r) => r.buy_rent === "Buy" },
    { key: "rent", label: "Rent Inquiries", dataKey: "buyRent", filter: (r) => r.buy_rent === "Rent" },
    { key: "buy-rent-unspecified", label: "Unspecified Buy/Rent Inquiries", dataKey: "buyRent", filter: (r) => !r.buy_rent, hideIfEmpty: true },
    { key: "measurement", label: "Land Survey & Measurement Inquiries", dataKey: "measurement" },
    { key: "land-documentation", label: "Land Documentation & 7/12 Services Inquiries", dataKey: "landDocumentation" },
    { key: "legal-court", label: "Legal Assistance & Land Dispute Resolution Inquiries", dataKey: "legalCourt" },
    { key: "government-land", label: "Government Land Services Inquiries", dataKey: "governmentLand" },
    { key: "na-service", label: "N.A. Land Conversion Inquiries", dataKey: "naService" },
    { key: "investment", label: "Investment & Property Consultation Inquiries", dataKey: "investment" },
    { key: "pmc", label: "PMC Services Inquiries", dataKey: "inquiries", filter: (r) => r.subject === "PMC Services Inquiry" },
    { key: "property-alert", label: "Property Alert Inquiries", dataKey: "propertyAlert" },
    { key: "land-finance", label: "Land Against Finance Inquiries", dataKey: "landFinance" },
    { key: "contact", label: "Contact Inquiries", dataKey: "inquiries", filter: (r) => r.subject !== "PMC Services Inquiry" },
];

const humanize = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const formatValue = (key, value) => {
    if (value === null || value === undefined || value === "") return "—";
    if (key === "created_at") return new Date(value).toLocaleString();
    if (typeof value === "boolean") return value ? "Yes" : "No";
    return String(value);
};

function ManageInquiries() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
    const [search, setSearch] = useState("");
    const [uploadingId, setUploadingId] = useState(null);

    const authHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem("access")}`,
    });

    const fetchAll = async () => {
        setLoading(true);
        setError("");
        try {
            const entries = Object.entries(ENDPOINTS);
            const results = await Promise.all(
                entries.map(([, path]) =>
                    fetch(`${API_BASE_URL}/api/${path}/`, { headers: authHeaders() }).then((res) => {
                        if (!res.ok) {
                            const err = new Error(`Failed to load ${path}`);
                            err.status = res.status;
                            throw err;
                        }
                        return res.json();
                    })
                )
            );

            const next = {};
            entries.forEach(([key], i) => {
                next[key] = Array.isArray(results[i]) ? results[i] : results[i]?.results || [];
            });
            setData(next);
        } catch (err) {
            console.error(err);
            if (isAuthError(err.status)) {
                handleAdminAuthError();
                return;
            }
            setError("Failed to load inquiries. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const markContacted = async (item) => {
        await fetch(`${API_BASE_URL}/api/inquiries/${item.id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeaders(),
            },
            body: JSON.stringify({ contacted: !item.contacted }),
        });
        fetchAll();
    };

    const deleteRecord = async (dataKey, id) => {
        if (!window.confirm("Delete this inquiry?")) return;

        await fetch(`${API_BASE_URL}/api/${ENDPOINTS[dataKey]}/${id}/`, {
            method: "DELETE",
            headers: authHeaders(),
        });
        fetchAll();
    };

    const uploadResultDocument = async (dataKey, record, file) => {
        setUploadingId(record.id);
        try {
            const formData = new FormData();
            // A full PUT/PATCH still needs the record's other required fields present.
            Object.entries(record).forEach(([key, value]) => {
                if (key !== "id" && key !== "result_document" && value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });
            formData.append("result_document", file);

            await fetch(`${API_BASE_URL}/api/${ENDPOINTS[dataKey]}/${record.id}/`, {
                method: "PATCH",
                headers: authHeaders(),
                body: formData,
            });
            fetchAll();
        } finally {
            setUploadingId(null);
        }
    };

    if (loading) return <h2 className="mi-status">Loading inquiries...</h2>;
    if (error) return <h2 className="mi-status mi-error">{error}</h2>;

    const visibleSections = SECTIONS.filter((section) => {
        const records = data[section.dataKey] || [];
        const filtered = section.filter ? records.filter(section.filter) : records;
        return !section.hideIfEmpty || filtered.length > 0;
    });

    const currentSection = SECTIONS.find((s) => s.key === activeSection) || SECTIONS[0];
    const currentRecords = (data[currentSection.dataKey] || []).filter(
        currentSection.filter || (() => true)
    );

    const searched = currentRecords.filter((record) =>
        JSON.stringify(record).toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...searched].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <div className="mi-page">
            <div className="mi-header">
                <div>
                    <h2>Manage Inquiries</h2>
                    <p>Customer Leads & Service Requests</p>
                </div>

                <input
                    type="text"
                    placeholder="Search in this section..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="mi-layout">
                <div className="mi-sidebar">
                    {visibleSections.map((section) => {
                        const records = data[section.dataKey] || [];
                        const count = (section.filter ? records.filter(section.filter) : records).length;

                        return (
                            <button
                                key={section.key}
                                className={`mi-tab ${activeSection === section.key ? "active" : ""}`}
                                onClick={() => {
                                    setActiveSection(section.key);
                                    setSearch("");
                                }}
                            >
                                <span>{section.label}</span>
                                <span className="mi-count">{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="mi-content">
                    <h3 className="mi-content-title">{currentSection.label}</h3>

                    {sorted.length === 0 ? (
                        <div className="mi-empty">No inquiries in this category yet.</div>
                    ) : (
                        <div className="mi-cards">
                            {sorted.map((record) => (
                                <div className="mi-card" key={record.id}>
                                    <div className="mi-card-grid">
                                        {Object.entries(record)
                                            .filter(([key]) => key !== "id" && key !== "result_document" && key !== "document")
                                            .map(([key, value]) => (
                                                <div className="mi-field" key={key}>
                                                    <span className="mi-field-label">{humanize(key)}</span>
                                                    <span className="mi-field-value">{formatValue(key, value)}</span>
                                                </div>
                                            ))}

                                        {Object.prototype.hasOwnProperty.call(record, "result_document") && (
                                            <div className="mi-field">
                                                <span className="mi-field-label">Result Document</span>
                                                <span className="mi-field-value">
                                                    {record.result_document ? (
                                                        <a href={record.result_document} target="_blank" rel="noopener noreferrer">
                                                            View Document
                                                        </a>
                                                    ) : "—"}
                                                </span>
                                            </div>
                                        )}

                                        {Object.prototype.hasOwnProperty.call(record, "document") && (
                                            <div className="mi-field">
                                                <span className="mi-field-label">Attached Document</span>
                                                <span className="mi-field-value">
                                                    {record.document ? (
                                                        <a href={record.document} target="_blank" rel="noopener noreferrer">
                                                            View Document
                                                        </a>
                                                    ) : "—"}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mi-card-actions">
                                        {currentSection.key === "land-documentation" && ANYROR_PORTAL_URL && (
                                            <a
                                                className="anyror-link-btn"
                                                href={ANYROR_PORTAL_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Look Up on AnyROR
                                            </a>
                                        )}
                                        {currentSection.key === "land-documentation" && (
                                            <label className="upload-doc-btn">
                                                {uploadingId === record.id
                                                    ? "Uploading..."
                                                    : record.result_document ? "Replace Document" : "Upload Document"}
                                                <input
                                                    type="file"
                                                    hidden
                                                    disabled={uploadingId === record.id}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) uploadResultDocument(currentSection.dataKey, record, file);
                                                        e.target.value = "";
                                                    }}
                                                />
                                            </label>
                                        )}
                                        {Object.prototype.hasOwnProperty.call(record, "contacted") && (
                                            <button
                                                className="contact-btn"
                                                onClick={() => markContacted(record)}
                                            >
                                                {record.contacted ? "Mark Pending" : "Mark Contacted"}
                                            </button>
                                        )}
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteRecord(currentSection.dataKey, record.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageInquiries;
