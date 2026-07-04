import "./PropertyCard.css";

import {
FaHeart,
FaBed,
FaBath,
FaRulerCombined,
FaMapMarkerAlt
} from "react-icons/fa";

function PropertyCard({property}){

return(

<div className="property-card">

<div className="property-image">

<img
src={property.image}
alt={property.title}
/>

<span className="property-status">

{property.status}

</span>

<button className="favorite-btn">

<FaHeart/>

</button>

</div>

<div className="property-content">

<h3>

{property.title}

</h3>

<p className="location">

<FaMapMarkerAlt/>

{property.location}

</p>

<h2 className="price">

{property.price}

</h2>

<div className="property-info">

<span>

<FaBed/>

{property.beds}

</span>

<span>

<FaBath/>

{property.baths}

</span>

<span>

<FaRulerCombined/>

{property.area}

</span>

</div>

<button className="details-btn">

View Details

</button>

</div>

</div>

)

}

export default PropertyCard;