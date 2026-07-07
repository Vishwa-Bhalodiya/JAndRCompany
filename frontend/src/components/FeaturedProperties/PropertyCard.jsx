import "./PropertyCard.css";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaArrowRight,
} from "react-icons/fa";

function PropertyCard({ Property }) {

  
  const image =
    Property.images?.length > 0
      ? Property.images[0].image
      : "/placeholder.jpg";

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="Property-card">

        <div className="Property-image">

          <img src={image} alt={Property.title} />

          {Property.featured && (
            <span className="featured-badge">
              ⭐ Featured
            </span>
          )}

          <span className="status-badge">
            {Property.status}
          </span>

          <button className="favorite-btn">
            <FaHeart />
          </button>

        </div>

        <div className="Property-content">

          <h2 className="Property-price">
            ₹{Number(Property.price).toLocaleString("en-IN")}
          </h2>

          <h3 className="Property-title">
            {Property.title}
          </h3>

          <p className="Property-location">
            <FaMapMarkerAlt />
            {Property.location}
          </p>

          <div className="Property-info">

            <span>
              <FaRulerCombined />
              {Property.area} Sq.ft
            </span>

            <span className="Property-type">
              {Property.Property_type}
            </span>

          </div>

          <Link
            to={`/Property/${Property.id}`}
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