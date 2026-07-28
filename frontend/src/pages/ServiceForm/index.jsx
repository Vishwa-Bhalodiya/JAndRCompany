import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ServiceForm.css";

const SERVICE_CONFIG = {
    "buy-rent": {
        title: "Buy & Rent Property Service",
        apiEndpoint: "http://localhost:8000/api/services/buy-rent/",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: true },
            { name: "location", label: "Location", type: "text", required: true },
            { name: "village_name", label: "Village Name", type: "text", required: true },
            { name: "district_name", label: "District Name", type: "text", required: true },
            { name: "taluka_name", label: "Taluka Name", type: "text", required: true },
        ]
    },
    "sell": {
        title: "Sell Property Service",
        apiEndpoint: "http://localhost:8000/api/services/sell/",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: true },
            { name: "location", label: "Location", type: "text", required: true },
            { name: "village_name", label: "Village Name", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "property_type", label: "Property Type", type: "select", options: ["Land", "Home", "Shop", "Plot"], required: true },
            { name: "buy_rent", label: "Buy / Rent", type: "select", options: ["Buy", "Rent"], required: true },
        ]
    },
    "measurement": {
        title: "Measurement (7/12) Service",
        apiEndpoint: "http://localhost:8000/api/services/measurement/",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: true },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
        ]
    },
    "legal-court": {
        title: "Legal & Court Service",
        apiEndpoint: "http://localhost:8000/api/services/legal-court/",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: true },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "problem_description", label: "Problem Description", type: "textarea", required: true },
        ]
    },
    "na-service": {
        title: "N.A. (Non-Agricultural) Service",
        apiEndpoint: "http://localhost:8000/api/services/na-service/",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: true },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "na_papers", label: "N.A. Papers Details", type: "text", required: true },
        ]
    },
    "investment": {
        title: "Investment Service",
        apiEndpoint: "http://localhost:8000/api/services/investment/",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
        ]
    }
};

const ServiceForm = () => {
    const { serviceType } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const config = SERVICE_CONFIG[serviceType];

    const formTitle = location.state?.title || config?.title;

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    if (!config) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <h2>Service Not Found</h2>
                <p>The requested service form does not exist.</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/about")}>Back to Services</button>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            await axios.post(config.apiEndpoint, formData);
            setSuccessMsg("Your inquiry has been submitted successfully!");
            setFormData({}); // clear form
            setTimeout(() => navigate("/about"), 3000);
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMsg("Failed to submit the form. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="service-form-section">
            <div className="container">
                <div className="form-wrapper">
                    <h2 className="text-center mb-4">{formTitle}</h2>
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}
                    {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {config.fields.map((field, idx) => (
                                <div className="col-md-6 mb-3" key={idx}>
                                    <label className="form-label">{field.label}</label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            className="form-control"
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                            rows="4"
                                        />
                                    ) : field.type === "select" ? (
                                        <select
                                            className="form-control"
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                        >
                                            <option value="">Select...</option>
                                            {field.options.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            className="form-control"
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                            required={field.required}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn submit-btn w-100" disabled={loading}>
                                {loading ? "Submitting..." : "Submit Inquiry"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ServiceForm;
