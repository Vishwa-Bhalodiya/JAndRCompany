import "./Hero.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero({ hero }) {
    return (
        <section className="hero">
            <div className="container">

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: "easeOut"
                    }}
                >

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6
                        }}
                    >
                        {hero.subtitle}
                    </motion.p>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8
                        }}
                    >
                        {hero.title}
                    </motion.h1>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.6,
                            duration: 0.8
                        }}
                    >
                        {hero.description}
                    </motion.p>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.8,
                            duration: 0.8
                        }}
                    >
                        <Link
                            to="/properties"
                            className="primary-btn"
                        >
                            Explore Properties
                        </Link>

                        <Link
                            to="/contact"
                            className="secondary-btn"
                        >
                            Contact Us
                        </Link>
                    </motion.div>

                </motion.div>

            </div>
        </section>
    );
}

export default Hero;