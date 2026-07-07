import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../AddProperty/AddProperty.css";

function EditProperty() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        property_type: "Residential",
        status: "For Sale",
        area: "",
        google_map: ""
    });

    useEffect(() => {
        loadAmenities();
        loadProperty();
    }, []);

    const loadAmenities = async () => {
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/properties/amenities/"
            );

            const data = await res.json();

            setAmenities(data);

        } catch (err) {
            console.error(err);
        }
    };

    const loadProperty = async () => {
        try {

            const res = await fetch(
                `http://127.0.0.1:8000/api/properties/${id}/`
            );

            const data = await res.json();

            setForm({
                title: data.title || "",
                description: data.description || "",
                price: data.price || "",
                location: data.location || "",
                property_type: data.property_type || "Residential",
                status: data.status || "For Sale",
                area: data.area || "",
                google_map: data.google_map || ""
            });

            setSelectedAmenities(
    data.amenities.map(item => item.id)
);
        } catch (err) {
            console.error(err);
            alert("Failed to load property");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAmenityChange = (amenityId) => {

        if (selectedAmenities.includes(amenityId)) {

            setSelectedAmenities(
                selectedAmenities.filter(id => id !== amenityId)
            );

        } else {

            setSelectedAmenities([
                ...selectedAmenities,
                amenityId
            ]);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("location", form.location);
            formData.append("property_type", form.property_type);
            formData.append("status", form.status);
            formData.append("area", form.area);
            formData.append("google_map", form.google_map);

            selectedAmenities.forEach(item => {
                formData.append("amenity_ids", item);
            });

            images.forEach(img => {
                formData.append("images", img);
            });

            documents.forEach(doc => {
                formData.append("documents", doc);
            });

            const response = await fetch(
                `http://127.0.0.1:8000/api/properties/${id}/`,
                {
                    method: "PUT",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                alert("Failed to update property");
                return;
            }

            alert("Property Updated Successfully!");

            navigate("/Dashboard/properties");

        } catch (err) {

            console.error(err);

            alert("Server Error");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {
        return <h2 style={{ padding: 30 }}>Loading Property...</h2>;
    }
    return (

    <div className="add-property-page">

        <div className="form-container">

            <h2>Edit Property</h2>

            <p>Update property details</p>

            <form onSubmit={handleSubmit}>

                <div className="grid-2">

                    <div className="form-group">

                        <label>Property Title</label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Property title"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Price</label>

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="5"
                    />

                </div>

                <div className="grid-2">

                    <div className="form-group">

                        <label>Location</label>

                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Area (Sqft)</label>

                        <input
                            type="number"
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="grid-2">

                    <div className="form-group">

                        <label>Property Type</label>

                        <select
                            name="property_type"
                            value={form.property_type}
                            onChange={handleChange}
                        >

                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Agricultural">Agricultural</option>
                            <option value="Industrial">Industrial</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >

                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                            <option value="Sold">Sold</option>

                        </select>

                    </div>

                </div>

                <div className="form-group">

                    <label>Google Map Link</label>

                    <input
                        name="google_map"
                        value={form.google_map}
                        onChange={handleChange}
                        placeholder="https://maps.google.com/..."
                    />

                </div>

                <div className="form-group">

                    <label>Amenities</label>

                    <div className="amenities-grid">

                        {amenities.map(item => (

                            <label
                                key={item.id}
                                className="amenity-item"
                            >

                                <input
                                    type="checkbox"
                                    checked={selectedAmenities.includes(item.id)}
                                    onChange={() => handleAmenityChange(item.id)}
                                />

                                {item.name}

                            </label>

                        ))}

                    </div>

                </div>

                <div className="form-group">

                    <label>Add New Images (Optional)</label>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setImages([...e.target.files])}
                    />

                </div>

                <div className="form-group">

                    <label>Add New Documents (Optional)</label>

                    <input
                        type="file"
                        multiple
                        onChange={(e) => setDocuments([...e.target.files])}
                    />

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "15px"
                    }}
                >

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={saving}
                    >

                        {saving
                            ? "Updating..."
                            : "Update Property"}

                    </button>

                    <button
                        type="button"
                        className="submit-btn"
                        style={{
                            background: "#666"
                        }}
                        onClick={() => navigate("/Dashboard/properties")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    </div>

);

}

export default EditProperty;