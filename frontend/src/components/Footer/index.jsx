import { motion } from "framer-motion";

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <motion.h4
                    className="mb-1 fw-bold text-success"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Bhumipun
                </motion.h4>

                <p className="mb-1 small text-light">
                    Presented by <strong>J and R Company</strong>
                </p>

                <small className="text-secondary">
                    © 2026 Bhumipun. All Rights Reserved.
                </small>
            </div>
        </footer>
    );
}

export default Footer;