import "./Contact.css";

import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn
} from "react-icons/fa";

function Contact() {

    return (

        <div className="contact-page">

            {/* HERO */}
            <section className="contact-hero">

                <div className="overlay"></div>

                <div className="container">

                    <h1>Contact Us</h1>

                    <p>
                        We are here to help you buy, sell and invest in premium
                        real estate with confidence.
                    </p>

                </div>

            </section>

            {/* CONTACT INFO */}
            <section className="contact-info container">

                <div className="info-card">

                    <FaPhoneAlt />

                    <h3>Call Us</h3>

                    <p>+91 99999 99999</p>

                </div>

                <div className="info-card">

                    <FaEnvelope />

                    <h3>Email</h3>

                    <p>boss@thejandrcompany.com</p>

                </div>

                <div className="info-card">

                    <FaMapMarkerAlt />

                    <h3>Office</h3>

                    <p>Gandhinagar, Gujarat, India</p>

                </div>

                <div className="info-card">

                    <FaClock />

                    <h3>Working Hours</h3>

                    <p>Mon - Sat | 9:00 AM - 7:00 PM</p>

                </div>

            </section>

            {/* CONTACT FORM */}
            <section className="contact-section container">

                <div className="contact-left">

                    <h2>Let's Talk</h2>

                    <p>
                        Have a property inquiry?
                        Fill out the form and our team will contact you shortly.
                    </p>

                    <form>

                        <input
                            type="text"
                            placeholder="Full Name"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                        />

                        <textarea
                            rows="6"
                            placeholder="Your Message"
                        ></textarea>

                        <button type="submit">
                            Send Message
                        </button>

                    </form>

                </div>

                <div className="contact-right">

                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=Gandhinagar,Gujarat&output=embed"
                        loading="lazy"
                    ></iframe>

                    <div className="socials">

                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaLinkedinIn />
                        </a>

                    </div>

                </div>

            </section>

        </div>

    );

}

export default Contact;