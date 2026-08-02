import { API_BASE_URL } from "../../config";
import "./Properties.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaThLarge, FaMapMarkedAlt } from "react-icons/fa";

import { getProperties } from "../../api/propertyApi";
import PropertiesMapView from "../../components/Property/PropertiesMapView";

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("grid");

    // ✅ All hooks must be at the top
    const navigate = useNavigate();
    const location = useLocation();

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

    const getImageUrl = (image) => {
        if (!image) return "/placeholder.jpg";

        if (image.startsWith("http")) return image;

        return `${API_BASE_URL}${image}`;
    };

    const queryParams = new URLSearchParams(location.search);
    const statusFilter = queryParams.get("status");

    const filteredProperties = properties.filter((property) => {
        if (!statusFilter) return true;
        return property.status === statusFilter;
    });

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

                <div className="properties-header">
                    <h1 className="page-title">
                        {statusFilter
                            ? `${statusFilter} Properties`
                            : "Properties"}
                    </h1>

                    <div className="view-toggle">
                        <button
                            className={view === "grid" ? "active" : ""}
                            onClick={() => setView("grid")}
                        >
                            <FaThLarge /> Grid
                        </button>
                        <button
                            className={view === "map" ? "active" : ""}
                            onClick={() => setView("map")}
                        >
                            <FaMapMarkedAlt /> Map
                        </button>
                    </div>
                </div>

                {view === "map" ? (
                    <PropertiesMapView properties={filteredProperties} />
                ) : (
                <div className="properties-grid">

                    {filteredProperties.length > 0 ? (

                        filteredProperties.map((property) => (

                            <div
                                className="Property-card"
                                key={property.id}
                            >

                                <img
                                    src={
                                        property.images &&
                                        property.images.length > 0
                                            ? getImageUrl(property.images[0].image)
                                            : "/placeholder.jpg"
                                    }
                                    alt={property.title}
                                    className="Property-image"
                                />

                                <div className="Property-content">

                                    <span className="Property-type">
                                        {property.Property_type}
                                    </span>

                                    <h2>{property.title}</h2>

                                    <p className="Property-location">
                                        📍 {property.location}
                                    </p>

                                    <p className="Property-area">
                                        {property.area} Sq.ft
                                    </p>

                                    <h3 className="Property-price">
                                        ₹ {Number(property.price).toLocaleString("en-IN")}
                                    </h3>

                                    <button
                                        className="details-btn"
                                        onClick={() => {
                                            const viewedProperties = JSON.parse(
                                                localStorage.getItem("viewedProperties") || "[]"
                                            );

                                            if (viewedProperties.includes(property.id)) {
                                                navigate(`/Property/${property.id}`);
                                            } else {
                                                navigate(`/inquiry/${property.id}`);
                                            }
                                        }}
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (
                        <h2>No Properties Found</h2>
                    )}

                </div>
                )}

            </div>
        </section>
    );
}

export default Properties;