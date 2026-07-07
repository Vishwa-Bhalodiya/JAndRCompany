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

function PropertyInfo({ Property }) {

  if (!Property) return null;

const saveProperty = async () => {
    try {

        const token = localStorage.getItem("access");

        const res = await axios.post(
            `${API_BASE_URL}/api/favorites/${Property.id}/`,
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

        alert("Failed to save Property");
    }
};


  return (
    <div className="Property-info-box">

      {/* Header */}
      <div className="Property-header">

        <div>

          <span className="Property-category">
            {Property.Property_type}
          </span>

          <h2>
            {Property.title}
          </h2>

          <p className="Property-location">
            <FaMapMarkerAlt />
            {Property.location}
          </p>

        </div>

        <div className="text-end">

          <h2 className="Property-price">
            ₹{Number(Property.price).toLocaleString("en-IN")}
          </h2>

          <button
                className="favorite-Property"
                onClick={saveProperty}
            >
                <FaHeart />
                Save Property
          </button>
        </div>

      </div>

      {/* Rating */}
      <div className="Property-rating">

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
            {Property.area} Sq.ft
          </p>

        </div>

        <div className="spec-card">

          <FaBuilding />

          <h5>Property Type</h5>

          <p>
            {Property.Property_type}
          </p>

        </div>

        <div className="spec-card">

          <FaCalendarAlt />

          <h5>Status</h5>

          <p>
            {Property.status}
          </p>

        </div>

        <div className="spec-card">

          <FaBuilding />

          <h5>Featured</h5>

          <p>
            {Property.featured ? "Yes" : "No"}
          </p>

        </div>

        <div className="spec-card">

          <FaMapMarkerAlt />

          <h5>Location</h5>

          <p>
            {Property.location}
          </p>

        </div>

      </div>

      {/* Description */}

      <div className="description">

        <h3>
          Property Description
        </h3>

        <p>
          {Property.description}
        </p>

      </div>

    </div>
  );
}

export default PropertyInfo;