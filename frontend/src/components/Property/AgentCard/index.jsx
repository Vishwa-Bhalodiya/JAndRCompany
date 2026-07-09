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

            <h3>Bhumipun</h3>

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

                    +91 98983 81668

                </p>

                <p>

                    <FaEnvelope />

                    boss@thejandrcompany.com

                </p>

                <p>

                    <FaMapMarkerAlt />

                    Gandhinagar, Gujarat

                </p>

                <p>

                    <FaCertificate />

                    GST Registered Consultant

                </p>

            </div>

            <div className="agent-buttons">

                <a
                    href="tel:+919898381668"
                    className="call-btn"
                >
                    <FaPhoneAlt />

                    Call Now

                </a>

                <a
                    href="https://wa.me/919898381668"
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