import { API_BASE_URL } from "../../../config";
import { useEffect, useState } from "react";
import "./AddProperty.css";

function AddProperty() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        Property_type: "Residential",
        status: "For Sale",
        area: "",
        google_map: ""
    });

    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAmenities();
    }, []);

    const fetchAmenities = async () => {
        try {

            const response = await fetch(
                `${API_BASE_URL}/api/properties/amenities/`
            );

            const data = await response.json();

            setAmenities(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleAmenityChange = (id) => {

        if (selectedAmenities.includes(id)) {

            setSelectedAmenities(
                selectedAmenities.filter(item => item !== id)
            );

        } else {

            setSelectedAmenities([
                ...selectedAmenities,
                id
            ]);

        }

    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleDocumentChange = (e) => {
        setDocuments([...e.target.files]);
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

        console.log("Selected Amenities:", selectedAmenities);
        const formData = new FormData();

        // Property Details
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("location", form.location);
        formData.append("Property_type", form.Property_type);
        formData.append("status", form.status);
        formData.append("area", form.area);
        formData.append("google_map", form.google_map);

        // Amenities
        selectedAmenities.forEach(id => {
            formData.append("amenity_ids", id);
        });

        // Images
        images.forEach(image => {
            formData.append("images", image);
        });

        // Documents
        documents.forEach(document => {
            formData.append("documents", document);
        });

        const response = await fetch(
            `${API_BASE_URL}/api/properties/`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log(data);
            alert("Failed to create Property");
            return;
        }

        console.log(data);

        alert("Property Created Successfully!");

        // Reset Form
        setForm({
            title: "",
            description: "",
            price: "",
            location: "",
            Property_type: "Residential",
            status: "For Sale",
            area: "",
            google_map: ""
        });

        setSelectedAmenities([]);
        setImages([]);
        setDocuments([]);

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

    finally {

        setLoading(false);

    }

};
    return (

        <div className="add-Property-page">

            <div className="form-container">

                <h2>Add New Property</h2>

                <p>Fill all Property details</p>

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
                                name="Property_type"
                                value={form.Property_type}
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

                        <label>Property Images</label>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImages([...e.target.files])}
                        />

                    </div>

                    <div className="form-group">

                        <label>Property Documents</label>

                        <input
                            type="file"
                            multiple
                            onChange={(e) => setDocuments([...e.target.files])}
                        />

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating..."
                            : "Create Property"}

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddProperty;