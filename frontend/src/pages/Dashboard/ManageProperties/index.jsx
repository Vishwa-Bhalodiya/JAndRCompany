import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const navigate = useNavigate();

  // ✅ Fetch properties
  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/properties/"
      );

      setProperties(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ Delete property
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/properties/${id}/`
      );

      fetchProperties();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete property");
    }
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/properties/edit/${id}`);
  };

  // ✅ FILTER LOGIC
  const filteredProperties = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || p.status === statusFilter;

    const matchType =
      typeFilter === "All" || p.property_type === typeFilter;

    return matchSearch && matchStatus && matchType;
  });

  if (loading) return <h3>Loading properties...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Properties</h2>

      {/* 🔍 SEARCH + FILTERS */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="All">All Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
          <option value="Sold">Sold</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      {/* 📊 TABLE */}
      <table
        border="1"
        cellPadding="10"
        width="100%"
        style={{ textAlign: "left" }}
      >
        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProperties.length === 0 ? (
            <tr>
              <td colSpan="6">No properties found</td>
            </tr>
          ) : (
            filteredProperties.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>₹{property.price}</td>
                <td>{property.location}</td>
                <td>{property.property_type}</td>

                {/* Status badge */}
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "5px",
                      background:
                        property.status === "For Sale"
                          ? "green"
                          : property.status === "For Rent"
                          ? "orange"
                          : "gray",
                      color: "white"
                    }}
                  >
                    {property.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleEdit(property.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(property.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProperties;