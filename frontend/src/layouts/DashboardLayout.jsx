import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function DashboardLayout() {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#0b0b0b"
            }}
        >
            <Sidebar />

            <div style={{ flex: 1 }}>
                <Topbar />

                <div style={{ padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;