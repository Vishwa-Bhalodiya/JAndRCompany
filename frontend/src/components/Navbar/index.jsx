import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services/auth";
import { FaHeart } from "react-icons/fa";

function Navbar() {
    const navigate = useNavigate();

    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg">

            <div className="container">

                {/* Company Logo */}
                <Link className="navbar-brand company-logo" to="/">
                    J & R Company
                </Link>

                {/* Mobile Toggle */}
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

                <div
                    className="collapse navbar-collapse"
                    id="navbarMenu"
                >

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

                        {user && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link d-flex align-items-center gap-2"
                                    to="/favorites"
                                >
                                    <FaHeart />
                                    Favorites
                                </Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>

                    </ul>

                    <div className="d-flex ms-lg-4 mt-3 mt-lg-0">

                        {user ? (
                            <button
                                className="login-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="login-btn"
                            >
                                Login
                            </Link>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;