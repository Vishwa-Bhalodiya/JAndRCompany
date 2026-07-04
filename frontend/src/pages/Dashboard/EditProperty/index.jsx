import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ✅ DELETE PROPERTY FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/properties/${id}/`
      );

      alert("Property deleted successfully!");

      // Refresh list after delete
      fetchProperties();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete property");
    }
  };

  // ✅ Edit navigation
  const handleEdit = (id) => {
    navigate(`/dashboard/properties/edit/${id}`);
  };

  if (loading) {
    return <h3>Loading properties...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Properties</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
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
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>{property.price}</td>
              <td>{property.location}</td>
              <td>{property.property_type}</td>
              <td>{property.status}</td>

              <td>
                <button
                  onClick={() => handleEdit(property.id)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(property.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProperties;