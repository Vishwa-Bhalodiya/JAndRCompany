import "./WhyChooseUs.css";

import {
FaBuilding,
FaUsers,
FaHandshake,
FaAward
} from "react-icons/fa";

function WhyChooseUs(){

const features=[

{
icon:<FaBuilding/>,
title:"Premium Properties",
text:"Carefully selected luxury apartments, villas and commercial properties."
},

{
icon:<FaUsers/>,
title:"Trusted Advisors",
text:"Experienced professionals guiding every step of your investment."
},

{
icon:<FaHandshake/>,
title:"Transparent Deals",
text:"No hidden charges. Complete legal assistance."
},

{
icon:<FaAward/>,
title:"Best Service",
text:"Customer satisfaction is our highest priority."
}

];

return(

<section className="trust-section">

<div className="container">

<div className="section-title">

<h2>Why Clients Trust Us</h2>

<p>

We combine experience, transparency, and premium service to deliver exceptional real estate solutions.

</p>

</div>

<div className="row">

{

features.map((item,index)=>(

<div
className="col-lg-3 col-md-6 mb-4"
key={index}
>

<div className="trust-card">

<div className="trust-icon">

{item.icon}

</div>

<h4>{item.title}</h4>

<p>{item.text}</p>

</div>

</div>

))

}

</div>

</div>

</section>

)

}

export default WhyChooseUs;