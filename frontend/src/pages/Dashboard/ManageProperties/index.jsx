import { API_BASE_URL } from "../../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthError, handleAdminAuthError } from "../../../utils/adminAuth";
import "./ManageProperties.css";

function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const navigate = useNavigate();

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  });

  const fetchProperties = async () => {
    setError("");
    try {
      const res = await axios.get(`${API_BASE_URL}/api/properties/?all=true`, {
        headers: authHeaders(),
      });
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      if (isAuthError(err.response?.status)) {
        handleAdminAuthError();
        return;
      }
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`${API_BASE_URL}/api/properties/${id}/`, {
      headers: authHeaders(),
    });
    fetchProperties();
  };

  const toggleFeatured = async (id) => {
  try {
    await axios.patch(
      `${API_BASE_URL}/api/properties/${id}/featured/`
    );

    // Reload the table
    fetchProperties();

  } catch (error) {
    console.error(error);
    alert("Failed to update featured status.");
  }
};

  const handleEdit = (id) => {
    navigate(`/Dashboard/edit-Property/${id}`);
  };

  const handlePublish = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/properties/${id}/`,
        { is_approved: true },
        { headers: authHeaders() }
      );
      fetchProperties();
    } catch (error) {
      console.error(error);
      alert("Failed to publish property.");
    }
  };

  const filtered = properties.filter((p) => {
    return (
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || p.status === statusFilter) &&
      (typeFilter === "All" || p.Property_type === typeFilter)
    );
  });

  if (loading)
    return <h3 className="loading-text">Loading properties...</h3>;

  if (error)
    return <h3 className="loading-text error-text">{error}</h3>;

  return (
    <div className="mp-container">

      {/* HEADER */}
      <div className="mp-header">
        <div>
          <h2>Manage Properties</h2>
          <p>Control your real estate listings</p>
        </div>

        <button
          className="add-btn"
          onClick={() => navigate("/Dashboard/add-Property")}
        >
          + Add Property
        </button>
      </div>

      {/* FILTERS */}
      <div className="mp-filters">

        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>For Sale</option>
          <option>For Rent</option>
          <option>Sold</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>All</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Agricultural</option>
          <option>Industrial</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="mp-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Publish Status</th>
              <th>Actions</th>
              <th> Featured</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No properties found
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td className="price">₹{p.price}</td>
                  <td>{p.location}</td>
                  <td>{p.Property_type}</td>

                  <td>
                    <span className={`status ${p.status}`}>
                      {p.status}
                    </span>
                  </td>

                  <td>
                    {p.is_approved ? (
                      <span className="publish-badge published">Published</span>
                    ) : (
                      <div className="publish-pending-cell">
                        <span className="publish-badge pending">Pending Review</span>
                        <button
                          className="publish-btn"
                          onClick={() => handlePublish(p.id)}
                        >
                          Publish
                        </button>
                      </div>
                    )}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(p.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <button
                      className={`featured-btn ${p.featured ? "active" : ""}`}
                      onClick={() => toggleFeatured(p.id)}
                    >
                      {p.featured ? "⭐ Featured" : "☆ Feature"}
                    </button>
                  </td>
                
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ManageProperties;