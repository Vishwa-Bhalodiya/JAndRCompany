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

        return `${API_BASE_URL}${image}`;
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
                     Properties
                </h1>

                {/* GRID */}
                <div className="properties-grid">

                    {properties.length > 0 ? (

                        properties.map((Property) => (

                            <div
                                className="Property-card"
                                key={Property.id}
                            >

                                {/* IMAGE */}
                                <img
                                    src={
                                        Property.images && Property.images.length > 0
                                            ? getImageUrl(Property.images[0].image)
                                            : "/placeholder.jpg"
                                    }
                                    alt={Property.title}
                                    className="Property-image"
                                />

                                {/* CONTENT */}
                                <div className="Property-content">

                                    <span className="Property-type">
                                        {Property.Property_type}
                                    </span>

                                    <h2>
                                        {Property.title}
                                    </h2>

                                    <p className="Property-location">
                                        📍 {Property.location}
                                    </p>

                                    <p className="Property-area">
                                        {Property.area} Sq.ft
                                    </p>

                                    <h3 className="Property-price">
                                        ₹ {Number(Property.price).toLocaleString("en-IN")}
                                    </h3>

                                    <Link
                                        to={`/Property/${Property.id}`}
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