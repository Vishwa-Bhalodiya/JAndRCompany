import PropertyCard from "./PropertyCard";

import property1 from "../../assets/images/properties/property1.jpg";
import property2 from "../../assets/images/properties/property2.jpg";
import property3 from "../../assets/images/properties/property3.jpg";

const properties = [

{
id:1,
image:property1,
status:"For Sale",
featured:true,
price:"₹1.25 Cr",
title:"Luxury Villa",
location:"Ahmedabad",
beds:4,
baths:3,
area:"2400 Sq Ft",
rating:4.9,
agent:"John Smith"
},

{
id:2,
image:property2,
status:"For Rent",
featured:false,
price:"₹85 Lakh",
title:"Modern Apartment",
location:"Rajkot",
beds:2,
baths:2,
area:"1200 Sq Ft",
rating:4.8,
agent:"Emma Watson"
},

{
id:3,
image:property3,
status:"For Sale",
featured:true,
price:"₹2.50 Cr",
title:"Premium Penthouse",
location:"Surat",
beds:5,
baths:4,
area:"3500 Sq Ft",
rating:5.0,
agent:"David Miller"
}

];


function FeaturedProperties() {

    return (

        <section className="featured-section">

            <div className="container-fluid px5">

                <div className="section-title text-center mb-5">

                    <h2>Featured Properties</h2>

                    <p>
                        Explore our premium collection of luxury properties.
                    </p>

                </div>

                <div className="row">

                    {properties.map((property, index) => (

                        <PropertyCard
                            key={index}
                            property={property}
                        />

                    ))}

                </div>

            </div>

        </section>

    );
}

export default FeaturedProperties;