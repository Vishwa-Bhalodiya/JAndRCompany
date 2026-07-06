import "./PropertyDetails.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Gallery from "../../components/property/Gallery";
import PropertyInfo from "../../components/property/PropertyInfo";
import Amenities from "../../components/property/Amenities";
import PropertyMap from "../../components/property/PropertyMap";
import AgentCard from "../../components/property/AgentCard";

import SimilarProperties from "../../components/property/SimilarProperties";

import PropertyDocuments from "../../components/property/PropertyDocuments";

function PropertyDetails() {

    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProperty();
    }, [id]);

    const loadProperty = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/properties/${id}/`);
            const data = await res.json();
            setProperty(data);
        } catch (error) {
            console.error("Failed to load property:", error);
        } finally {
            setLoading(false);
        }
    };

    // LOADING STATE
    if (loading) {
        return (
            <div className="loading">
                <h2>Loading Property...</h2>
            </div>
        );
    }

    // NOT FOUND STATE
    if (!property) {
        return (
            <div className="loading">
                <h2>Property Not Found</h2>
            </div>
        );
    }

    return (
        <>
            {/* BANNER */}
            <section className="property-banner">
                <div className="container">
                    <h1>{property.title}</h1>
                    <p>
                        {property.location} • {property.status}
                    </p>
                </div>
            </section>

            {/* DETAILS SECTION */}
            <section className="property-details">
                <div className="container">

                    {/* GALLERY */}
                    <Gallery images={property.images} />

                    <div className="row mt-5">

                        {/* LEFT SIDE */}
                        <div className="col-lg-8">

                            <PropertyInfo property={property} />
                            console.log(property.amenities);
                            <Amenities amenities={property.amenities} />

                            <PropertyMap
                                googleMap={property.google_map}
                                location={property.location}
                            />

                            

                           

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="col-lg-4">

                            <AgentCard property={property} />

                            <PropertyDocuments documents={property.documents} />

                            

                            

                        </div>

                    </div>

                </div>
            </section>

            {/* SIMILAR PROPERTIES */}
            <SimilarProperties propertyId={property.id} />
        </>
    );
}

export default PropertyDetails;