import "./PropertySearch.css";

function PropertySearch() {

    return (

        <div className="search-wrapper">

            <div className="search-box">

                <div className="row g-3">

                    <div className="col-lg-2">

                        <select className="form-select">

                            <option>Location</option>

                            <option>Ahmedabad</option>

                            <option>Rajkot</option>

                            <option>Surat</option>

                            <option>Junagadh</option>

                        </select>

                    </div>

                    <div className="col-lg-2">

                        <select className="form-select">

                            <option>Property Type</option>

                            <option>Apartment</option>

                            <option>Villa</option>

                            <option>Office</option>

                            <option>Plot</option>

                        </select>

                    </div>

                    <div className="col-lg-2">

                        <select className="form-select">

                            <option>Price</option>

                            <option>₹20L - ₹50L</option>

                            <option>₹50L - ₹1Cr</option>

                            <option>₹1Cr+</option>

                        </select>

                    </div>

                    <div className="col-lg-2">

                        <select className="form-select">

                            <option>Bedrooms</option>

                            <option>1 BHK</option>

                            <option>2 BHK</option>

                            <option>3 BHK</option>

                            <option>4 BHK+</option>

                        </select>

                    </div>

                    <div className="col-lg-2">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Area (Sq Ft)"
                        />

                    </div>

                    <div className="col-lg-2">

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