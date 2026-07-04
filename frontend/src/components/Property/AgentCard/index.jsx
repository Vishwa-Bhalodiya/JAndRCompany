import "./AgentCard.css";

import {
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaCertificate
} from "react-icons/fa";

import agent from "../../../assets/images/agent.jpg";

function AgentCard() {

    return (

        <div className="agent-card">

            <img
                src={agent}
                alt="Property Consultant"
                className="agent-image"
            />

            <h3>J & R Company</h3>

            <p className="agent-role">

                Land Investment Consultant

            </p>

            <div className="agent-specialization">

                <h5>Specialization</h5>

                <ul>

                    <li>Residential Plots</li>

                    <li>Commercial Land</li>

                    <li>Industrial Land</li>

                    <li>Agricultural Land</li>

                    <li>Investment Properties</li>

                </ul>

            </div>

            <div className="agent-info">

                <p>

                    <FaPhoneAlt />

                    +91 98765 43210

                </p>

                <p>

                    <FaEnvelope />

                    info@jandrcompany.com

                </p>

                <p>

                    <FaMapMarkerAlt />

                    Ahmedabad, Gujarat

                </p>

                <p>

                    <FaCertificate />

                    RERA Registered Consultant

                </p>

            </div>

            <div className="agent-buttons">

                <a
                    href="tel:+919876543210"
                    className="call-btn"
                >
                    <FaPhoneAlt />

                    Call Now

                </a>

                <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-btn"
                >
                    <FaWhatsapp />

                    WhatsApp

                </a>

            </div>

        </div>

    );

}

export default AgentCard;