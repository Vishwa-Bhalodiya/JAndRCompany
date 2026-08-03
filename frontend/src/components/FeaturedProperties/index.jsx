import PropertyCard from "./PropertyCard";

function FeaturedProperties({ properties = [] }) {

    return (

        <section className="featured-section">

            <div className="container-fluid px-5">

                <div className="section-title text-center mb-5">

                    <h2>Featured Properties</h2>

                    <p>
                        Explore our collection.
                    </p>

                </div>

                <div className="row">

                    {properties.length > 0 ? (

                        properties.map((Property) => (

                            <PropertyCard
                                key={Property.id}
                                Property={Property}
                            />

                        ))

                    ) : (

                        <div className="text-center text-white">

                            No featured properties available.

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

}

export default FeaturedProperties;