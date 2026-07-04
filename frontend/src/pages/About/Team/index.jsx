import "./Team.css";

const team=[

{

name:"ABCD",

position:"Founder & CEO",

image:"https://i.pravatar.cc/400?img=11"

},

{

name:"PQRS",

position:"Sales Director",

image:"https://i.pravatar.cc/400?img=12"

},

{

name:"XYZ",

position:"Legal Advisor",

image:"https://i.pravatar.cc/400?img=32"

}

];

function Team(){

return(

<section className="team-section">

<div className="container">

<div className="section-title">

<h2>Leadership Team</h2>

<p>

Meet the professionals behind J & R Company.

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