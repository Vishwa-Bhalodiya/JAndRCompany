import "./Stats.css";

function Stats({ stats }) {

    const items = [

        {
            title: "Properties",
            number: stats.total_properties
        },

        {
            title: "For Sale",
            number: stats.for_sale
        },

        {
            title: "For Rent",
            number: stats.for_rent
        },

        {
            title: "Sold",
            number: stats.sold
        }

    ];

    return (

        <section className="stats-section">

            <div className="container">

                <div className="row">

                    {items.map((item, index) => (

                        <div
                            className="col-lg-3"
                            key={index}
                        >

                            <div className="stat-card">

                                <h2>{item.number}</h2>

                                <p>{item.title}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Stats;