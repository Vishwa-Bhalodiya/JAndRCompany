import "./About.css";

import aboutImage from "../../assets/images/about.jpg";

import { motion } from "framer-motion";
import WhyChooseUs from "./WhyChooseUs";
import Team from "./Team";
import Timeline from "./Timeline";
import CTA from "./CTA";
import Testimonials from "./Testimonial";

import {
    FaCheckCircle
} from "react-icons/fa";

function About() {

    return (

        <>

            {/* Banner */}

            <section className="about-banner">

                <div className="container">

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        About J & R Company
                    </motion.h1>

                    <p>
                        Premium Real Estate Solutions Across India
                    </p>

                </div>

            </section>


            {/* About Section */}

            <section className="about-section">

                <div className="container">

                    <div className="row align-items-center">

                        {/* Left Image */}

                        <div className="col-lg-6">

                            <img
                                src={aboutImage}
                                className="img-fluid rounded"
                                alt="About J & R Company"
                            />

                        </div>


                        {/* Right Content */}

                        <div className="col-lg-6">

                            <h2>
                                Your Trusted Real Estate Partner
                            </h2>

                            <p>

                                J & R Company specializes in luxury residential,
                                commercial, and investment properties across India.
                                We help buyers, sellers, and investors make smart
                                real estate decisions with complete transparency,
                                legal guidance, and expert consultation.

                            </p>

                            <div className="about-list">

                                <p>
                                    <FaCheckCircle />
                                    Trusted Company
                                </p>

                                <p>
                                    <FaCheckCircle />
                                    Verified Properties
                                </p>

                                <p>
                                    <FaCheckCircle />
                                    Legal Assistance
                                </p>

                                <p>
                                    <FaCheckCircle />
                                    Investment Consultation
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Why Choose Us */}

            <WhyChooseUs />


            {/* Leadership Team */}

            <Team />


            {/* Company Timeline */}

            <Timeline />


            {/* Client Testimonials */}

            <Testimonials />


            {/* Call To Action */}

            <CTA />

        </>

    );

}

export default About;