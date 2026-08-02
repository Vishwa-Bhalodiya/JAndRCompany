import { useState } from "react";
import "./PropertyDocuments.css";

import {
    FaFilePdf,
    FaDownload,
    FaCheckCircle,
    FaClock,
    FaSpinner
} from "react-icons/fa";

function PropertyDocuments({ documents = [] }) {
    const [downloadingId, setDownloadingId] = useState(null);

    const visibleDocuments = documents.filter((doc) => doc.status !== "rejected");

    const handleDownload = async (doc, index) => {
        setDownloadingId(doc.id);

        try {
            const response = await fetch(doc.document);

            if (!response.ok) {
                throw new Error("Failed to fetch document");
            }

            const blob = await response.blob();
            const extension = doc.document.split(".").pop().split("?")[0];
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `property-document-${index + 1}.${extension}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error downloading document:", error);
            window.open(doc.document, "_blank", "noopener,noreferrer");
        } finally {
            setDownloadingId(null);
        }
    };

    return (

        <section className="documents-section">

            <h2>
                Property Documents
            </h2>

            <p>
                All legal documents are verified and available for buyers.
            </p>

            {visibleDocuments.length > 0 ? (

                visibleDocuments.map((doc, index) => (

                    <div
                        className="document-card"
                        key={doc.id}
                    >

                        <div className="document-left">

                            <FaFilePdf />

                            <div>

                                <h5>
                                    Document {index + 1}
                                </h5>

                                {doc.status === "verified" ? (
                                    <span className="status-verified">
                                        <FaCheckCircle />
                                        Verified
                                    </span>
                                ) : (
                                    <span className="status-pending">
                                        <FaClock />
                                        Pending Review
                                    </span>
                                )}

                            </div>

                        </div>

                        <button
                            type="button"
                            className="download-btn"
                            onClick={() => handleDownload(doc, index)}
                            disabled={downloadingId === doc.id}
                        >
                            {downloadingId === doc.id ? (
                                <>
                                    <FaSpinner className="spin" />
                                    Downloading...
                                </>
                            ) : (
                                <>
                                    <FaDownload />
                                    Download
                                </>
                            )}
                        </button>

                    </div>

                ))

            ) : (

                <div className="document-card">

                    <p>No documents available.</p>

                </div>

            )}

        </section>

    );

}

export default PropertyDocuments;