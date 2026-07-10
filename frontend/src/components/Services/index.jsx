import "./Services.css";
import { motion } from "framer-motion";

import {
    FaHome,
    FaBuilding,
    FaKey,
    FaChartLine,
    FaFileContract,
    FaHandsHelping,
    FaMapMarkedAlt,
    FaBalanceScale,
    FaClipboardList,
    FaLandmark,
    FaDraftingCompass,
    FaRegFileAlt,
    FaLeaf,
    FaHardHat 
} from "react-icons/fa";


const services = [
    {
        icon: <FaBuilding />,
        title: "Sell Property",
        description:
            "Sell your Property quickly with professional marketing, valuation, and verified buyers."
    },
    {
        icon: <FaHome />,
        title: "Buy Property",
        description:
            "Explore residential, commercial, and agricultural properties with complete legal support."
    },
    
    {
        icon: <FaKey />,
        title: "Rent Property",
        description:
            "Find residential and commercial rental properties that match your requirements and budget."
    },
    {
        icon: <FaDraftingCompass />,
        title: "Land Survey & Measurement",
        description:
            "Accurate land measurement, boundary verification, and professional surveying services."
    },
    {
        icon: <FaRegFileAlt />,
        title: "Land Documentation & 7/12 Services",
        description:
            "Expert assistance with land registration, title verification, legal documentation, and complete 7/12 record preparation, correction, and updates."
    },
    {
    icon: <FaBalanceScale />,
    title: "Legal Assistance & Land Dispute Resolution",
    description:
        "Comprehensive legal support for property documentation, title verification, compliance, land disputes, and representation in property-related legal matters."
    },
    {
        icon: <FaLandmark />,
        title: "Government Land Services",
        description:
            "Expert assistance for government land matters, regularization, and legal procedures."
    },

    {
        icon: <FaLeaf />,
        title: "N.A. Land Conversion",
        description:
            "Complete Non-Agricultural (N.A.) land conversion services with government approvals."
    },
    {
        icon: <FaChartLine />,
        title: "Investment & Property Consultation",
        description:
            "Get expert guidance on buying, selling, investing, and maximizing returns from residential, commercial, and land properties with personalized consultation."
    },
    

    {
    icon: <FaHardHat />,
    title: "PMC Services",
    description:
        "Expert Project Management Consultancy for construction projects, ensuring quality, budget control, and on-time completion."
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

                                

                            </motion.div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Services;