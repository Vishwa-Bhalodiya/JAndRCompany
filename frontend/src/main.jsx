import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./styles/global.css";

import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <AppRoutes />
    </UserProvider>
);