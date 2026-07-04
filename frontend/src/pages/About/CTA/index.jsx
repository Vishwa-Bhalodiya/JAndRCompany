import "./CTA.css";

import {Link} from "react-router-dom";

function CTA(){

return(

<section className="cta-section">

<div className="container text-center">

<h2>

Ready To Find Your Dream Property?

</h2>

<p>

Start your real estate journey with J & R Company today.

</p>

<Link
to="/properties"
className="primary-btn"
>

Explore Properties

</Link>

</div>

</section>

)

}

export default CTA;