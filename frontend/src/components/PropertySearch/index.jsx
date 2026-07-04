import "./PropertySearch.css";

function PropertySearch({
    locations = [],
    propertyTypes = []
}) {

    return (

        <div className="search-wrapper">

            <div className="search-box">

                <div className="row g-3">

                    <div className="col-lg-3">

                        <select className="form-select">

                            <option value="">
                                Select Location
                            </option>

                            {locations.map((location) => (

                                <option
                                    key={location}
                                    value={location}
                                >
                                    {location}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-lg-3">

                        <select className="form-select">

                            <option value="">
                                Property Type
                            </option>

                            {propertyTypes.map((type) => (

                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-lg-3">

                        <select className="form-select">

                            <option>For Sale</option>

                            <option>For Rent</option>

                            <option>Sold</option>

                        </select>

                    </div>

                    <div className="col-lg-3">

                        <button className="search-btn">

                            Search

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PropertySearch;