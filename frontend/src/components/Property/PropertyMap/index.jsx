import "./PropertyMap.css";

import { FaMapMarkerAlt } from "react-icons/fa";

function PropertyMap({ googleMap, location }) {

    return (

        <section className="Property-map">

            <h2>
                Property Location
            </h2>

            <p className="map-address">
                <FaMapMarkerAlt />
                {location || "Location not available"}
            </p>

            <div className="map-container">

                {googleMap ? (

                    <iframe
                        title="Google Map"
                        src={googleMap}
                        loading="lazy"
                        allowFullScreen
                    />

                ) : (

                    <div className="no-map">
                        <h4>Google Map Not Available</h4>
                    </div>

                )}

            </div>

        </section>

    );

}

export default PropertyMap;