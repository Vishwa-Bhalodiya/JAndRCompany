import "./PropertyDocuments.css";

import {
    FaFilePdf,
    FaDownload,
    FaCheckCircle
} from "react-icons/fa";

function PropertyDocuments({ documents = [] }) {

    return (

        <section className="documents-section">

            <h2>
                Property Documents
            </h2>

            <p>
                All legal documents are verified and available for buyers.
            </p>

            {documents.length > 0 ? (

                documents.map((doc) => (

                    <div
                        className="document-card"
                        key={doc.id}
                    >

                        <div className="document-left">

                            <FaFilePdf />

                            <div>

                                <h5>
                                    {doc.name}
                                </h5>

                                <span>

                                    <FaCheckCircle />

                                    Available

                                </span>

                            </div>

                        </div>

                        <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-btn"
                        >
                            <FaDownload />
                            Download
                        </a>

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