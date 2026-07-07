import "./Contact.css";

import { useState } from "react";

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

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/inquiries/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (!response.ok) {

                console.log(data);

                alert("Failed to send inquiry.");

                setLoading(false);

                return;

            }

            alert("Inquiry sent successfully!");

            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });

        }

        catch (error) {

            console.error(error);

            alert("Server Error");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="contact-page">

            {/* HERO */}

            <section className="contact-hero">

                <div className="overlay"></div>

                <div className="container">

                    <h1>Contact Us</h1>

                    <p>
                        We are here to help you buy, sell and invest in premium real estate.
                    </p>

                </div>

            </section>

            {/* INFO */}

            <section className="contact-info container">

                <div className="info-card">
                    <FaPhoneAlt />
                    <h3>Call Us</h3>
                    <p>+91 9898381668</p>
                </div>

                <div className="info-card">
                    <FaEnvelope />
                    <h3>Email</h3>
                    <p>boss@thejandrcompany.com</p>
                </div>

                <div className="info-card">
                    <FaMapMarkerAlt />
                    <h3>Office</h3>
                    <p>Gandhinagar, Gujarat</p>
                </div>

                <div className="info-card">
                    <FaClock />
                    <h3>Working Hours</h3>
                    <p>Mon - Sun | 10 AM - 7 PM</p>
                </div>

            </section>

            {/* FORM */}

            <section className="contact-section container">

                <div className="contact-left">

                    <h2>Let's Talk</h2>

                    <p>
                        Fill the form below and our team will contact you.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                        />

                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            required
                        />

                        <textarea
                            rows="6"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            required
                        ></textarea>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Inquiry"}
                        </button>

                    </form>

                </div>

                <div className="contact-right">

                    <iframe
                        title="map"
                        src="https://www.google.com/maps?q=Gandhinagar,Gujarat&output=embed"
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