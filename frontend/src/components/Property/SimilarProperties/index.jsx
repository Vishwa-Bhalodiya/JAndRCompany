import "./SimilarProperties.css";

function SimilarProperties() {

    return (

        <section className="similar-properties">

            <div className="container">

                <h2 className="section-title">
                    Similar Land Listings
                </h2>

                <div className="row">

                    <div className="col-lg-4 col-md-6 mb-4">

                        <div className="similar-card">

                            <img
                                src="/src/assets/images/properties/property1.jpg"
                                alt="Land"
                            />

                            <div className="similar-content">

                                <span className="badge">Residential Plot</span>

                                <h4>Premium NA Plot</h4>

                                <p>Ahmedabad, Gujarat</p>

                                <h5>₹3.25 Cr</h5>

                                <button className="view-btn">
                                    View Details
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default SimilarProperties;