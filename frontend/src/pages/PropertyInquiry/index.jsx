import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import PropertyInquiryForm from "../../components/Property/PropertyInquiryForm";
import "./PropertyInquiry.css";

function PropertyInquiry() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        setLoading(true);

        fetch(`${API_BASE_URL}/api/properties/${id}/`)
            .then((res) => res.json())
            .then((data) => {
                if (active) setProperty(data);
            })
            .catch((error) => console.error("Failed to load property:", error))
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [id]);

    if (loading) {
        return (
            <section className="property-inquiry-page">
                <div className="container text-center">
                    <h2 className="loading-text">Loading property...</h2>
                </div>
            </section>
        );
    }

    if (!property) {
        return (
            <section className="property-inquiry-page">
                <div className="container text-center">
                    <h2 className="loading-text">Property not found.</h2>
                    <Link to="/properties" className="view-full-link">Back to Properties</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="property-inquiry-page">
            <div className="container">
                <div className="property-summary">
                    <span className="property-summary-badge">{property.status}</span>
                    <h1>{property.title}</h1>
                    <p>
                        {property.location} · ₹{Number(property.price).toLocaleString("en-IN")} · {property.area} Sq.ft
                    </p>
                    <p className="gate-note">
                        Submit the inquiry below to unlock full property details, gallery, and documents.
                    </p>
                </div>

                <PropertyInquiryForm property={property} />
            </div>
        </section>
    );
}

export default PropertyInquiry;
