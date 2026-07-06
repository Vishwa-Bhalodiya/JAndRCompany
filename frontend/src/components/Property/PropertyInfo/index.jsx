import "./PropertyInfo.css";
import axios from "axios";

import {
  FaHeart,
  FaStar,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

function PropertyInfo({ property }) {

  if (!property) return null;

const saveProperty = async () => {
    try {

        const token = localStorage.getItem("access");

        const res = await axios.post(
            `http://127.0.0.1:8000/api/favorites/${property.id}/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert(res.data.message);

    } catch (error) {

        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Headers:", error.response?.headers);

        alert("Failed to save property");
    }
};


  return (
    <div className="property-info-box">

      {/* Header */}
      <div className="property-header">

        <div>

          <span className="property-category">
            {property.property_type}
          </span>

          <h2>
            {property.title}
          </h2>

          <p className="property-location">
            <FaMapMarkerAlt />
            {property.location}
          </p>

        </div>

        <div className="text-end">

          <h2 className="property-price">
            ₹{Number(property.price).toLocaleString("en-IN")}
          </h2>

          <button
                className="favorite-property"
                onClick={saveProperty}
            >
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
          Featured Property
        </span>

      </div>

      {/* Specifications */}
      <div className="specifications">

        <div className="spec-card">

          <FaRulerCombined />

          <h5>Area</h5>

          <p>
            {property.area} Sq.ft
          </p>

        </div>

        <div className="spec-card">

          <FaBuilding />

          <h5>Property Type</h5>

          <p>
            {property.property_type}
          </p>

        </div>

        <div className="spec-card">

          <FaCalendarAlt />

          <h5>Status</h5>

          <p>
            {property.status}
          </p>

        </div>

        <div className="spec-card">

          <FaBuilding />

          <h5>Featured</h5>

          <p>
            {property.featured ? "Yes" : "No"}
          </p>

        </div>

        <div className="spec-card">

          <FaMapMarkerAlt />

          <h5>Location</h5>

          <p>
            {property.location}
          </p>

        </div>

      </div>

      {/* Description */}

      <div className="description">

        <h3>
          Property Description
        </h3>

        <p>
          {property.description}
        </p>

      </div>

    </div>
  );
}

export default PropertyInfo;