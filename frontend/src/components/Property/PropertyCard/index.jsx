import "./PropertyCard.css";

import {
FaHeart,
FaBed,
FaBath,
FaRulerCombined,
FaMapMarkerAlt
} from "react-icons/fa";

function PropertyCard({Property}){

return(

<div className="Property-card">

<div className="Property-image">

<img
    src={
        Property.images?.length > 0
            ? Property.images[0].image
            : "/placeholder.jpg"
    }
    alt={Property.title}
/>

<span className="Property-status">

{Property.status}

</span>

<button className="favorite-btn">

<FaHeart/>

</button>

</div>

<div className="Property-content">

<h3>

{Property.title}

</h3>

<p className="location">

<FaMapMarkerAlt/>

{Property.location}

</p>

<h2 className="price">

{Property.price}

</h2>

<div className="Property-info">

<span>

<FaBed/>

{Property.beds}

</span>

<span>

<FaBath/>

{Property.baths}

</span>

<span>

<FaRulerCombined/>

{Property.area}

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