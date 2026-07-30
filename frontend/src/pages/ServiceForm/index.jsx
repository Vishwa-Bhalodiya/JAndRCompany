import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle,
    FaPaperPlane
} from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import "./ServiceForm.css";

const SERVICE_CONFIG = {
    "buy-rent": {
        title: "Buy & Rent Property Service",
        apiEndpoint: `${API_BASE_URL}/api/services/buy-rent/`,
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
        apiEndpoint: `${API_BASE_URL}/api/services/sell/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "location", label: "Location", type: "text", required: true },
            { name: "village_name", label: "Village Name", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "property_type", label: "Property Type", type: "select", options: ["Land", "Home", "Shop", "Plot"], required: true },
            { name: "buy_rent", label: "Sell / Rent", type: "select", options: [{ label: "Sell", value: "Buy" }, { label: "Rent", value: "Rent" }], required: true },
        ]
    },
    "measurement": {
        title: "Measurement (7/12) Service",
        apiEndpoint: `${API_BASE_URL}/api/services/measurement/`,
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
        apiEndpoint: `${API_BASE_URL}/api/services/legal-court/`,
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
        apiEndpoint: `${API_BASE_URL}/api/services/na-service/`,
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
        apiEndpoint: `${API_BASE_URL}/api/services/investment/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
        ]
    },
    "property-alert": {
        title: "Property Alert Service",
        apiEndpoint: `${API_BASE_URL}/api/services/property-alert/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "property_type", label: "Property Type", type: "select", options: ["Land", "Home", "Shop", "Plot"], required: true },
            { name: "buy_rent", label: "Buy / Rent", type: "select", options: [{ label: "Buy", value: "Buy" }, { label: "Rent", value: "Rent" }], required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "location", label: "Preferred Location", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "budget_range", label: "Budget Range", type: "text", required: false },
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
            <section className="service-form-section">
                <div className="container text-center">
                    <div className="form-wrapper not-found-card">
                        <h2>Service Not Found</h2>
                        <p>The requested service form does not exist.</p>
                        <button className="btn submit-btn mt-3" onClick={() => navigate("/about")}>Back to Services</button>
                    </div>
                </div>
            </section>
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

        // Forms with both survey_no and building_name fields: require at least one
        const hasSurveyField = config.fields.some((f) => f.name === "survey_no");
        const hasBuildingField = config.fields.some((f) => f.name === "building_name");
        if (hasSurveyField && hasBuildingField) {
            const hasSurvey = formData.survey_no?.trim();
            const hasBuilding = formData.building_name?.trim();
            if (!hasSurvey && !hasBuilding) {
                setErrorMsg("Please provide either a Survey No. or a Building Name.");
                setLoading(false);
                return;
            }
        }

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

    const renderInput = (field) => {
        if (field.type === "textarea") {
            return (
                <textarea
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    rows="4"
                />
            );
        }

        if (field.type === "select") {
            return (
                <select
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                >
                    <option value="">Select {field.label}</option>

                    {field.options.map((opt, i) => {
                        const value = typeof opt === "object" ? opt.value : opt;
                        const label = typeof opt === "object" ? opt.label : opt;

                        return (
                            <option key={i} value={value}>
                                {label}
                            </option>
                        );
                    })}
                </select>
            );
        }

        return (
            <input
                type={field.type}
                className="form-control"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                placeholder={`Enter ${field.label.toLowerCase()}`}
            />
        );
    };

    return (
    <section className="service-form-section">
        <div className="container">
            <motion.div
                className="form-wrapper"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link to="/about" className="back-link">
                    <FaArrowLeft /> Back to Services
                </Link>

                <div className="form-header">
                    <h2>{formTitle}</h2>
                    <p>Share your details below and our team will get back to you shortly.</p>
                </div>

                {successMsg && (
                    <div className="form-alert form-alert-success">
                        <FaCheckCircle />
                        <span>{successMsg}</span>
                    </div>
                )}

                {errorMsg && (
                    <div className="form-alert form-alert-error">
                        <FaExclamationTriangle />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {config.fields.map((field, idx) => {

                            const hasBuildingNameField = config.fields.some((f) => f.name === "building_name");

                            // Skip building_name; it's rendered together with survey_no below
                            if (field.name === "building_name" && hasBuildingNameField) {
                                return null;
                            }

                            // Survey No. OR Building Name (only when this service actually has both fields)
                            if (field.name === "survey_no" && hasBuildingNameField) {
                                return (
                                    <div className="field field-full or-group" key={idx}>
                                        <div className="field">
                                            <label className="form-label">Survey No.</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="survey_no"
                                                value={formData.survey_no || ""}
                                                onChange={handleChange}
                                                placeholder="Enter survey no."
                                            />
                                        </div>

                                        <div className="or-divider">
                                            <span>OR</span>
                                        </div>

                                        <div className="field">
                                            <label className="form-label">Building Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="building_name"
                                                value={formData.building_name || ""}
                                                onChange={handleChange}
                                                placeholder="Enter building name"
                                            />
                                        </div>
                                    </div>
                                );
                            }

                            const fieldClass = field.type === "textarea" ? "field field-full" : "field";

                            return (
                                <div className={fieldClass} key={idx}>
                                    <label className="form-label">
                                        {field.label}
                                        {field.required && <span className="required-mark">*</span>}
                                    </label>
                                    {renderInput(field)}
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : (<>Submit Inquiry <FaPaperPlane /></>)}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    </section>
);
};

export default ServiceForm;
