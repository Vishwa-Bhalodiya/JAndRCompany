import { logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div style={{
            height: "70px",
            background: "#111",
            borderBottom: "1px solid rgba(212,175,55,.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            color: "#fff"
        }}>

            <h3 style={{ color: "#37b5d4" }}>Dashboard</h3>

            <button
                onClick={handleLogout}
                style={{
                    background: "#37b5d4",
                    border: "none",
                    padding: "8px 15px",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>

        </div>
    );
}

export default Topbar;