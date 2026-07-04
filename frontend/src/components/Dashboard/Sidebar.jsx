import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "260px",
                background: "#111",
                color: "#fff",
                padding: "20px",
                borderRight: "1px solid rgba(212,175,55,.2)",
                minHeight: "100vh"
            }}
        >
            <h2
                style={{
                    color: "#D4AF37",
                    marginBottom: "30px"
                }}
            >
                J & R Company
            </h2>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >
                {/* Dashboard Home */}
                <Link style={linkStyle} to="/dashboard">
                    📊 Dashboard
                </Link>

                {/* Admin Profile */}
                <Link style={linkStyle} to="/dashboard/profile">
                    👤 Profile
                </Link>

                {/* Add Property */}
                <Link style={linkStyle} to="/dashboard/add-property">
                    ➕ Add Property
                </Link>

                {/* Manage Properties */}
                <Link style={linkStyle} to="/dashboard/properties">
                    🏠 Manage Properties
                </Link>

                {/* Future Pages */}
                <Link style={linkStyle} to="#">
                    📨 Inquiries
                </Link>

                <Link style={linkStyle} to="#">
                    ⭐ Reviews
                </Link>

                <Link style={linkStyle} to="#">
                    👥 Users
                </Link>

                <Link style={linkStyle} to="#">
                    ⚙️ Settings
                </Link>
            </nav>
        </div>
    );
}

const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "8px",
    transition: "0.3s",
    background: "#1b1b1b",
    fontSize: "15px",
    fontWeight: "500"
};

export default Sidebar;