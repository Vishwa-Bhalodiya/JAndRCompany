import "./PropertyInfo.css";

import {
    FaHeart,
    FaStar,
    FaMapMarkerAlt,
    FaRulerCombined,
    FaRoad,
    FaMountain,
    FaBolt,
    FaTint,
    FaBuilding,
    FaCalendarAlt
} from "react-icons/fa";

function PropertyInfo() {

    return (

        <div className="property-info-box">

            {/* Header */}

            <div className="property-header">

                <div>

                    <span className="property-category">
                        Investment Land
                    </span>

                    <h2>
                        Premium NA Plot in Ahmedabad
                    </h2>

                    <p className="property-location">

                        <FaMapMarkerAlt />

                        SG Highway, Ahmedabad, Gujarat

                    </p>

                </div>

                <div className="text-end">

                    <h2 className="property-price">

                        ₹3.25 Cr

                    </h2>

                    <button className="favorite-property">

                        <FaHeart />

                        Save Property

                    </button>

                </div>

            </div>

            {/* Rating */}

            <div className="property-rating">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

                <span>
                    4.9 (82 Reviews)
                </span>

            </div>

            {/* Specifications */}

            <div className="specifications">

                <div className="spec-card">

                    <FaRulerCombined />

                    <h5>Plot Area</h5>

                    <p>12,500 Sq.ft</p>

                </div>

                <div className="spec-card">

                    <FaRoad />

                    <h5>Road Width</h5>

                    <p>80 Feet</p>

                </div>

                <div className="spec-card">

                    <FaBuilding />

                    <h5>Land Type</h5>

                    <p>NA Residential</p>

                </div>

                <div className="spec-card">

                    <FaMountain />

                    <h5>Facing</h5>

                    <p>East</p>

                </div>

                <div className="spec-card">

                    <FaBolt />

                    <h5>Electricity</h5>

                    <p>Available</p>

                </div>

                <div className="spec-card">

                    <FaTint />

                    <h5>Water Supply</h5>

                    <p>Available</p>

                </div>

                <div className="spec-card">

                    <FaCalendarAlt />

                    <h5>Possession</h5>

                    <p>Immediate</p>

                </div>

                <div className="spec-card">

                    <FaBuilding />

                    <h5>Zoning</h5>

                    <p>Residential</p>

                </div>

                <div className="spec-card">

                    <FaMapMarkerAlt />

                    <h5>Location</h5>

                    <p>Prime Area</p>

                </div>

            </div>

            {/* Description */}

            <div className="description">

                <h3>

                    Property Description

                </h3>

                <p>

                    This premium NA land is located on SG Highway,
                    Ahmedabad, making it an excellent opportunity for
                    residential development or long-term investment.
                    The property has a wide road frontage, clear legal
                    title, electricity and water connections nearby,
                    and excellent connectivity to schools, hospitals,
                    shopping centers, and major highways.

                </p>

            </div>

        </div>

    );

}

export default PropertyInfo;