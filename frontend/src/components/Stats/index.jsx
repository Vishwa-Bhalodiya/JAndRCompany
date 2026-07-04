import "./Stats.css";

function Stats() {

    const stats = [
        { number: 1500, title: "Properties Sold" },
        { number: 850, title: "Happy Clients" },
        { number: 15, title: "Years Experience" },
        { number: 50, title: "Expert Agents" },
    ];

    return (
        <section className="stats-section">
            <div className="container">
                <div className="row">
                    {stats.map((item, index) => (
                        <div className="col-lg-3" key={index}>
                            <div className="stat-card">
                                <h2>{item.number}+</h2>
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