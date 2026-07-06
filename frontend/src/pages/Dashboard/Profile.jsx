import { useUser } from "../../context/UserContext";

function Profile() {

    const { user } = useUser();

    return (
        <div style={{ color: "#fff" }}>

            <h2 style={{ color: "#37b5d4", marginBottom: "20px" }}>
                My Profile
            </h2>

            <div style={{
                background: "#181818",
                padding: "30px",
                borderRadius: "12px",
                border: "1px solid rgba(212,175,55,.15)",
                maxWidth: "600px"
            }}>

                <div style={{ marginBottom: "20px" }}>
                    <label>Name</label>
                    <input
                        value={user?.name || ""}
                        style={inputStyle}
                        readOnly
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label>Email</label>
                    <input
                        value={user?.email || ""}
                        style={inputStyle}
                        readOnly
                    />
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label>Phone</label>
                    <input
                        value={user?.phone || ""}
                        style={inputStyle}
                        readOnly
                    />
                </div>

            </div>

        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "#fff"
};

export default Profile;