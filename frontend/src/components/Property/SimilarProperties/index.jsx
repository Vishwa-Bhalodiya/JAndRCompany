import { API_BASE_URL } from "../../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SimilarProperties.css";

function SimilarProperties({ PropertyId }) {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (PropertyId) {
            loadSimilarProperties();
        }
    }, [PropertyId]);

    const loadSimilarProperties = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${API_BASE_URL}/api/properties/${PropertyId}/similar/`
            );

            const data = await res.json();
            setProperties(data || []);

        } catch (error) {
            console.error("Failed to load similar properties", error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading similar properties...</p>;
    }

    if (!properties.length) {
        return <p>No similar properties found</p>;
    }

    return (
        <section className="similar-properties">
            <div className="container">

                <h2 className="section-title">
                    Similar Land Listings
                </h2>

                <div className="row">

                    {properties.map((item) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={item.id}
                        >

                            <div className="similar-card">

                                {/* ✅ FIX IMAGE (handles array properly) */}
                                <img
                                    src={
                                        item.images?.length > 0
                                            ? `${API_BASE_URL}${item.images[0].image}`
                                            : "/default.jpg"
                                    }
                                    alt={item.title}
                                />

                                <div className="similar-content">

                                    <span className="badge">
                                        {item.Property_type}
                                    </span>

                                    <h4>{item.title}</h4>

                                    <p>{item.location}</p>

                                    <h5>₹{item.price}</h5>

                                    {/* ✅ FIX NAVIGATION */}
                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate(`/Property/${item.id}`)
                                        }
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default SimilarProperties;