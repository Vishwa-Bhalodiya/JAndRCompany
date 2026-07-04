import "./Properties.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProperties } from "../../api/propertyApi";

function Properties() {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await getProperties();
            setProperties(data);
        } catch (error) {
            console.error("Failed to load properties:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Fix Django image URL issue
    const getImageUrl = (image) => {
        if (!image) return "/placeholder.jpg";

        // If already full URL (Django media)
        if (image.startsWith("http")) return image;

        return `http://127.0.0.1:8000${image}`;
    };

    if (loading) {
        return (
            <div className="properties-loading">
                <h2>Loading Properties...</h2>
            </div>
        );
    }

    return (
        <section className="properties-page">

            <div className="container">

                {/* PAGE TITLE */}
                <h1 className="page-title">
                    Premium Properties
                </h1>

                {/* GRID */}
                <div className="properties-grid">

                    {properties.length > 0 ? (

                        properties.map((property) => (

                            <div
                                className="property-card"
                                key={property.id}
                            >

                                {/* IMAGE */}
                                <img
                                    src={getImageUrl(property.image)}
                                    alt={property.title}
                                    className="property-image"
                                />

                                {/* CONTENT */}
                                <div className="property-content">

                                    <span className="property-type">
                                        {property.property_type}
                                    </span>

                                    <h2>
                                        {property.title}
                                    </h2>

                                    <p className="property-location">
                                        📍 {property.location}
                                    </p>

                                    <p className="property-area">
                                        {property.area} Sq.ft
                                    </p>

                                    <h3 className="property-price">
                                        ₹ {Number(property.price).toLocaleString("en-IN")}
                                    </h3>

                                    <Link
                                        to={`/property/${property.id}`}
                                        className="details-btn"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        ))

                    ) : (
                        <h2>No Properties Found</h2>
                    )}

                </div>

            </div>

        </section>
    );
}

export default Properties;