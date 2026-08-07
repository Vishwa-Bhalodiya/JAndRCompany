import "./Team.css";

const team=[

{

name:"Jatin Panchal",

position:"Founder & CEO & Government Consultant & Legal Advisor & Account Related Problem & Land Devlopment Consultant & PMC Services",

image:""

},



{

name:"Kiran Patel(B. D. Patel)",

position:"Legal Advisor",

image:""

},

{

name:"Rahul Baraiya",

position:"Buyer-Seller Consultant",

image:""

},

{

name:"Shreya Patel",

position:"Account Related Problem",

image:""

},

{

name:"Vishwa Bhalodiya",

position:" Service Related Problem",

image:""

},

{

name:"Rajkumarbhai Sharma",

position:"Land Devlopment Consultant & PMC Services",

image:""

},

{

name:"Jitendra Nayak",

position:"Investment Advisor & Property Consultant",

image:""

}



];

function Team(){

return(

<section className="team-section">

<div className="container">

<div className="section-title">

<h2>Leadership Team</h2>

<p>

Meet the professionals behind Bhumipun.

</p>

</div>

<div className="row">

{

team.map((person,index)=>(

<div
className="col-lg-4"
key={index}
>

<div className="team-card">

{person.image ? (
<img
src={person.image}
alt={person.name}
/>
) : (
<div className="team-card-photo-placeholder" />
)}

<h4>

{person.name}

</h4>

<p>

{person.position}

</p>

</div>

</div>

))

}

</div>

</div>

</section>

)

}

export default Team;
