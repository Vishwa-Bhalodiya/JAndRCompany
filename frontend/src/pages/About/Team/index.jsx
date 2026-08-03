import "./Team.css";

const team=[

{

name:"Jatin Panchal",

position:"Founder & CEO & Government Consultant & Legal Advisor & Account Related Problem & Land Devlopment Consultant & PMC Services",

image:"/JatinPanchal.png"

},



{

name:"Kiran Patel(B. D. Patel)",

position:"Legal Advisor",

image:"/KiranPatel.jpeg"

},

{

name:"Rahul Baraiya",

position:"Buyer-Seller Consultant",

image:"/RahulBariya.jpg"

},

{

name:"Shreya Patel",

position:"Account Related Problem",

image:"/ShreyaPatel.jpeg"

},

{

name:"Vishwa Bhalodiya",

position:" Service Related Problem",

image:"/VishwaBhalodiya.jpeg"

},

{

name:"Rajkumarbhai Sharma",

position:"Land Devlopment Consultant & PMC Services",

image:"https://i.pravatar.cc/400?img=11"

},

{

name:"Jitendra Nayak",

position:"Investment Advisor & Property Consultant",

image:"https://i.pravatar.cc/400?img=11"

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

<img
src={person.image}
alt={person.name}
/>

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