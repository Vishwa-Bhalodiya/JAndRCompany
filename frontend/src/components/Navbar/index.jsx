import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">

            <div className="container">

                {/* Company Name */}
                <Link className="navbar-brand company-logo" to="/">
                    J & R Company
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Menu */}
                <div className="collapse navbar-collapse" id="navbarMenu">

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/properties">
                                Properties
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/agents">
                                Agents
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>

                    </ul>

                    <div className="d-flex ms-lg-4 mt-3 mt-lg-0">

                        <Link to="/login" className="login-btn">
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;