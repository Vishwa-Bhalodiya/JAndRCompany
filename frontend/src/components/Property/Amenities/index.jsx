import "./Amenities.css";

import {
    FaCertificate,
    FaRoad,
    FaBolt,
    FaTint,
    FaShieldAlt,
    FaMapMarkedAlt,
    FaTree,
    FaBuilding,
    FaFileSignature,
    FaParking,
    FaCity,
    FaCheckCircle
} from "react-icons/fa";

// Icons will be assigned automatically
const icons = [
    <FaCertificate />,
    <FaFileSignature />,
    <FaRoad />,
    <FaBolt />,
    <FaTint />,
    <FaShieldAlt />,
    <FaMapMarkedAlt />,
    <FaTree />,
    <FaBuilding />,
    <FaParking />,
    <FaCity />,
    <FaCheckCircle />
];

function Amenities({ amenities }) {

    console.log(amenities);

    if (!amenities || amenities.length === 0) {
        return (
            <section className="amenities-section">
                <h2>Land Features & Amenities</h2>
                <p>No amenities available.</p>
            </section>
        );
    }

    return (

        <section className="amenities-section">

            <h2>Land Features & Amenities</h2>

            <div className="row">

                {amenities.map((item, index) => (

                    <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={item.id}
                    >

                        <div className="amenity-card">

                            <div className="amenity-icon">
                                {icons[index % icons.length]}
                            </div>

                            <h5>{item.name}</h5>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default Amenities;