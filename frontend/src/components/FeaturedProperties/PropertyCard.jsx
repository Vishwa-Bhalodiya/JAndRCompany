import "./PropertyCard.css";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaArrowRight,
} from "react-icons/fa";

function PropertyCard({ property }) {

  
  const image =
    property.images?.length > 0
      ? property.images[0].image
      : "/placeholder.jpg";

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="property-card">

        <div className="property-image">

          <img src={image} alt={property.title} />

          {property.featured && (
            <span className="featured-badge">
              ⭐ Featured
            </span>
          )}

          <span className="status-badge">
            {property.status}
          </span>

          <button className="favorite-btn">
            <FaHeart />
          </button>

        </div>

        <div className="property-content">

          <h2 className="property-price">
            ₹{Number(property.price).toLocaleString("en-IN")}
          </h2>

          <h3 className="property-title">
            {property.title}
          </h3>

          <p className="property-location">
            <FaMapMarkerAlt />
            {property.location}
          </p>

          <div className="property-info">

            <span>
              <FaRulerCombined />
              {property.area} Sq.ft
            </span>

            <span className="property-type">
              {property.property_type}
            </span>

          </div>

          <Link
            to={`/property/${property.id}`}
            className="details-btn"
          >
            View Details
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </div>
  );
}

export default PropertyCard;