import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= LAYOUTS ================= */
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/* ================= AUTH GUARD ================= */
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

/* ================= PUBLIC PAGES ================= */
import Home from "../pages/Home";
import About from "../pages/About";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Contact from "../pages/Contact";
import Agents from "../pages/Agents";

/* ================= AUTH PAGES ================= */
import Login from "../pages/Login";
import Register from "../pages/Register";

/* ================= Dashboard PAGES ================= */
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";
import ManageProperties from "../pages/Dashboard/ManageProperties";
import AddProperty from "../pages/Dashboard/AddProperty/AddProperty";
import EditProperty from "../pages/Dashboard/EditProperty";
import ManageInquiries from "../pages/Dashboard/ManageInquiries";
import Favorites from "../pages/Favorites/index";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= Dashboard (SAAS CORE) ================= */}
        <Route
          path="/Dashboard"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        >
          {/* DEFAULT Dashboard */}
          <Route index element={<DashboardHome />} />
          <Route path="inquiries" element={<ManageInquiries />}
/>

          {/* USER PROFILE */}
          <Route path="profile" element={<Profile />} />

          {/* PROPERTY MANAGEMENT (CRM CORE) */}
          <Route path="properties" element={<ManageProperties />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="edit-property/:id" element={<EditProperty />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;