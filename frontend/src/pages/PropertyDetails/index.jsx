import { API_BASE_URL } from "../../config";
import "./PropertyDetails.css";

import { useEffect, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";

import Gallery from "../../components/Property/Gallery";
import PropertyInfo from "../../components/Property/PropertyInfo";
import Amenities from "../../components/Property/Amenities";
import PropertyMap from "../../components/Property/PropertyMap";
import AgentCard from "../../components/Property/AgentCard";
import PropertyInquiryForm from "../../components/Property/PropertyInquiryForm";

import SimilarProperties from "../../components/Property/SimilarProperties";

import PropertyDocuments from "../../components/Property/PropertyDocuments";
import { isAuthenticated } from "../../services/auth";

function PropertyDetails() {

    const { id } = useParams();
    const location = useLocation();

    const [Property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProperty();
    }, [id]);

    const loadProperty = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/properties/${id}/`);
            const data = await res.json();
            setProperty(data);
        } catch (error) {
            console.error("Failed to load Property:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated()) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname + location.search, message: "Please log in to view property details." }}
                replace
            />
        );
    }

    // LOADING STATE
    if (loading) {
        return (
            <div className="loading">
                <h2>Loading Property...</h2>
            </div>
        );
    }

    // NOT FOUND STATE
    if (!Property) {
        return (
            <div className="loading">
                <h2>Property Not Found</h2>
            </div>
        );
    }

    return (
        <>
            {/* BANNER */}
            <section className="Property-banner">
                <div className="container">
                    <h1>{Property.title}</h1>
                    <p>
                        {Property.location} • {Property.status}
                    </p>
                </div>
            </section>

            {/* DETAILS SECTION */}
            <section className="Property-details">
                <div className="container">

                    {/* GALLERY */}
                    <Gallery images={Property.images} />

                    <div className="row mt-5">

                        {/* LEFT SIDE */}
                        <div className="col-lg-8">

                            <PropertyInfo Property={Property} />
                            <Amenities amenities={Property.amenities} />

                            <PropertyMap
                                googleMap={Property.google_map}
                                location={Property.location}
                                latitude={Property.latitude}
                                longitude={Property.longitude}
                                boundaryPoints={Property.boundary_points}
                                surveyNo={Property.survey_no}
                            />

                            <PropertyInquiryForm property={Property} />

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="col-lg-4">

                            <AgentCard Property={Property} />

                            <PropertyDocuments documents={Property.documents} />

                            

                            

                        </div>

                    </div>

                </div>
            </section>

            {/* SIMILAR PROPERTIES */}
            <SimilarProperties PropertyId={Property.id} />
        </>
    );
}

export default PropertyDetails;