import "./Services.css";
import { motion } from "framer-motion";

import {
    FaHome,
    FaKey,
    FaBuilding,
    FaFileContract,
    FaChartLine,
    FaHandsHelping
} from "react-icons/fa";

const services = [
    {
        icon: <FaHome />,
        title: "Buy Property",
        description:
            "Discover luxury apartments, villas, and commercial properties across India."
    },
    {
        icon: <FaBuilding />,
        title: "Sell Property",
        description:
            "Sell your property quickly with our professional marketing and trusted buyers."
    },
    {
        icon: <FaKey />,
        title: "Rent Property",
        description:
            "Find premium rental homes and commercial spaces at the best prices."
    },
    {
        icon: <FaChartLine />,
        title: "Investment Advice",
        description:
            "Get expert guidance to maximize your return on real estate investments."
    },
    {
        icon: <FaFileContract />,
        title: "Legal Assistance",
        description:
            "Complete legal documentation and verification for safe property transactions."
    },
    {
        icon: <FaHandsHelping />,
        title: "Property Consultation",
        description:
            "Our experienced consultants help you make confident real estate decisions."
    }
];

function Services() {

    return (

        <section className="services-section">

            <div className="container">

                <div className="section-title text-center">

                    <h2>Our Services</h2>

                    <p>
                        We provide complete real estate solutions for buying,
                        selling, renting, investing, and legal assistance.
                    </p>

                </div>

                <div className="row mt-5">

                    {services.map((service, index) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={index}
                        >

                            <motion.div
                                className="service-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -10
                                }}
                            >

                                <div className="service-icon">

                                    {service.icon}

                                </div>

                                <h3>

                                    {service.title}

                                </h3>

                                <p>

                                    {service.description}

                                </p>

                                <button className="service-btn">

                                    Learn More

                                </button>

                            </motion.div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Services;