import "./Timeline.css";

function Timeline(){

const items=[

["2010","Company Founded"],

["2015","500+ Properties Sold"],

["2022","Expanded Across Gujarat"],

["2026","Luxury Projects Nationwide"]

];

return(

<section className="timeline-section">

<div className="container">

<div className="section-title">

<h2>Our Journey</h2>

</div>

<div className="timeline">

{

items.map((item,index)=>(

<div
className="timeline-item"
key={index}
>

<h3>{item[0]}</h3>

<p>{item[1]}</p>

</div>

))

}

</div>

</div>

</section>

)

}

export default Timeline;