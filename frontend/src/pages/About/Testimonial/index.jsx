import "./Testimonial.css";

function Testimonials() {

    const testimonials = [

        {
            name: "ABCD",
            review: "Buying our first land through J & R Company was smooth and completely transparent."
        },

        {
            name: "XYZ",
            review: "The team was extremely professional and helped us find the perfect investment property."
        },

        {
            name: "pqr",
            review: "Excellent customer service and verified properties. Highly recommended for real estate investments."
        }

    ];

    return (

        <section className="testimonial-section">

            <div className="container">

                <div className="section-title">

                    <h2>What Our Clients Say</h2>

                    <p>
                        Trusted by hundreds of happy customers.
                    </p>

                </div>

                <div className="row">

                    {

                        testimonials.map((item, index) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="testimonial-card">

                                    <div className="stars">
                                        ⭐⭐⭐⭐⭐
                                    </div>

                                    <p className="review">
                                        "{item.review}"
                                    </p>

                                    <h5>
                                        {item.name}
                                    </h5>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Testimonials;