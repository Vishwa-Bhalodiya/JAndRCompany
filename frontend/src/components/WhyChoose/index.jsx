import "./WhyChoose.css";

import {
    FaBuilding,
    FaHandshake,
    FaShieldAlt,
    FaDollarSign
} from "react-icons/fa";

const features = [
    {
        icon: <FaBuilding />,
        title: "Premium Properties",
        text: "Luxury apartments, villas and commercial spaces."
    },
    {
        icon: <FaDollarSign />,
        title: "Best Investment",
        text: "Get maximum return on your investment."
    },
    {
        icon: <FaShieldAlt />,
        title: "Trusted Company",
        text: "100% transparent documentation and legal support."
    },
    {
        icon: <FaHandshake />,
        title: "Expert Guidance",
        text: "Professional assistance from start to finish."
    }
];

function WhyChoose() {
    return (
        <section className="why-section">

            <div className="container">

                <div className="section-title text-center">

                    <h2>Why Choose J & R Company</h2>

                    <p>
                        We provide premium real estate services with complete transparency.
                    </p>

                </div>

                <div className="row mt-5">

                    {features.map((item, index) => (

                        <div className="col-lg-3 col-md-6 mb-4" key={index}>

                            <div className="feature-card">

                                <div className="feature-icon">
                                    {item.icon}
                                </div>

                                <h4>{item.title}</h4>

                                <p>{item.text}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default WhyChoose;