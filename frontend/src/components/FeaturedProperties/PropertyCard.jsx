import "./FeaturedProperties.css";

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaUser
} from "react-icons/fa";

function PropertyCard({ property }) {
  return (
    <div className="col-lg-4 col-md-6 mb-5">

      <div className="property-card">

        <div className="property-image-wrapper">

          <img
        src={
            property.images?.length > 0
                ? property.images[0].image
                : "/placeholder.jpg"
        }
        alt={property.title}
    />

          <button className="favorite-btn">
            <FaHeart />
          </button>

          {property.featured && (
            <span className="featured-badge">
              Featured
            </span>
          )}

          <span className="status-badge">
            {property.status}
          </span>

        </div>

        <div className="property-body">

          <h3 className="property-price">
            {property.price}
          </h3>

          <h4 className="property-title">
            {property.title}
          </h4>

          <p className="property-location">
            <FaMapMarkerAlt /> {property.location}
          </p>

          <div className="property-rating">
            <FaStar />
            {property.rating}
          </div>

          <div className="property-info">

            <span>
              <FaBed />
              {property.beds} Beds
            </span>

            <span>
              <FaBath />
              {property.baths} Baths
            </span>

            <span>
              <FaRulerCombined />
              {property.area}
            </span>

          </div>

          <div className="property-footer">

            <div className="agent">
              <FaUser />
              {property.agent}
            </div>

            <button className="details-btn">
              View Details
              <FaArrowRight />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PropertyCard;