import "./PropertyFilter.css";

function PropertyFilter({

    filters,
    setFilters,
    resetFilters

}){

    const handleChange=(e)=>{

        setFilters({

            ...filters,

            [e.target.name]:e.target.value

        });

    };

    return(

<section className="property-filter">

<div className="row">

<div className="col-lg-3">

<input
type="text"
placeholder="Search Location"
name="location"
value={filters.location}
onChange={handleChange}
/>

</div>

<div className="col-lg-2">

<select
name="type"
value={filters.type}
onChange={handleChange}
>

<option value="">

All Types

</option>

<option>

Residential

</option>

<option>

Commercial

</option>

<option>

Agricultural

</option>

<option>

Industrial

</option>

</select>

</div>

<div className="col-lg-2">

<select
name="status"
value={filters.status}
onChange={handleChange}
>

<option value="">

Status

</option>

<option>

For Sale

</option>

<option>

For Lease

</option>

</select>

</div>

<div className="col-lg-2">

<input
type="number"
placeholder="Max Budget"
name="budget"
value={filters.budget}
onChange={handleChange}
/>

</div>

<div className="col-lg-2">

<input
type="number"
placeholder="Min Area"
name="area"
value={filters.area}
onChange={handleChange}
/>

</div>

<div className="col-lg-1">

<button
onClick={resetFilters}
className="reset-btn"
>

Reset

</button>

</div>

</div>

</section>

    )

}

export default PropertyFilter;