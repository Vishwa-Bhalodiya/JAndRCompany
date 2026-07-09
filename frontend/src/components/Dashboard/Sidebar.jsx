import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div style={styles.sidebar}>
            
        {/* BRAND */}
        <div style={styles.logoContainer}>
            <h2 style={styles.logo}>Bhumipun</h2>
            <p style={styles.tagline}>Presented by J and R Company</p>
        </div>

            <nav style={styles.nav}>

                {/* Dashboard */}
                <Link style={linkStyle} to="/Dashboard">
                    📊 Dashboard
                </Link>

                {/* Add Property */}
                <Link style={linkStyle} to="/Dashboard/add-Property">
                    ➕ Add Property
                </Link>

                {/* Manage Properties */}
                <Link style={linkStyle} to="/Dashboard/properties">
                    🏠 Manage Properties
                </Link>

                <Link style={linkStyle} to="/Dashboard/inquiries">
                    📨 Manage Inquiries
                </Link>

            </nav>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {

    logoContainer: {
        textAlign: "center",
        lineHeight : "1.2"
    },

    sidebar: {
        width: "260px",
        background: "#0B0B0B",
        color: "#fff",
        padding: "20px",
        borderRight: "1px solid rgba(212,175,55,.2)",
        minHeight: "100vh"
    },

    logo: {
        color: "#37b5d4",
        margin: "0px",
        fontSize: "2rem",
        letterSpacing: "1px",
        fontWeight: "700"
    },

    tagline: {
        fontSize: "0.8rem",
        color:"#FAEBD7",
        margin: "4px 0 30px",
        fontWeight: "500",
        letterSpacing: "0.5px",
    },

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    }
};

const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    padding: "12px 15px",
    borderRadius: "8px",
    background: "#1b1b1b",
    fontSize: "15px",
    fontWeight: "500",
    transition: "0.3s"
};

export default Sidebar;