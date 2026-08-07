import { useState } from "react";
import { useParams, useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle,
    FaPaperPlane
} from "react-icons/fa";
import { API_BASE_URL } from "../../config";
import PropertyLocationPicker from "../../components/Property/PropertyLocationPicker";
import { isAuthenticated } from "../../services/auth";
import "./ServiceForm.css";

const SERVICE_CONFIG = {
    "buy-rent": {
        title: "Buy & Rent Property Service",
        apiEndpoint: `${API_BASE_URL}/api/services/buy-rent/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
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
            { name: "price", label: "Expected Price (₹)", type: "number", required: true },
            { name: "area", label: "Area (Sq.ft)", type: "number", required: true },
            { name: "images", label: "Property Images", type: "file", multiple: true, required: false },
            { name: "documents", label: "Property Documents", type: "file", multiple: true, required: false, accept: ".pdf,.doc,.docx,image/*" },
        ]
    },
    "measurement": {
        title: "Measurement (7/12) Service",
        apiEndpoint: `${API_BASE_URL}/api/services/measurement/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "document", label: "Documents", type: "file", required: false, accept: ".pdf,.doc,.docx,image/*" },
        ]
    },
    "legal-court": {
        title: "Legal & Court Service",
        apiEndpoint: `${API_BASE_URL}/api/services/legal-court/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "problem_description", label: "Problem Description", type: "textarea", required: true },
            { name: "document", label: "Documents", type: "file", required: false, accept: ".pdf,.doc,.docx,image/*" },
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
            { name: "na_papers", label: "N.A. Papers Details", type: "text", required: true, full: true },
            { name: "document", label: "Documents", type: "file", required: false, accept: ".pdf,.doc,.docx,image/*" },
        ]
    },
    "land-documentation": {
        title: "Land Documentation & 7/12 Service",
        apiEndpoint: `${API_BASE_URL}/api/services/land-documentation/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true, full: true },
        ]
    },
    "government-land": {
        title: "Government Land Service",
        apiEndpoint: `${API_BASE_URL}/api/services/government-land/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: true },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "matter_details", label: "Details of Government Land Matter", type: "text", required: true, full: true },
            { name: "document", label: "Documents", type: "file", required: false, accept: ".pdf,.doc,.docx,image/*" },
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
            { name: "location", label: "Preferred Location", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "district", label: "District", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "document", label: "Documents", type: "file", required: false, accept: ".pdf,.doc,.docx,image/*" },
        ]
    },
    "land-finance": {
        title: "Land Against Finance",
        apiEndpoint: `${API_BASE_URL}/api/services/land-finance/`,
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "mobile_no", label: "Mobile No.", type: "text", required: true },
            { name: "survey_no", label: "Survey No.", type: "text", required: false },
            { name: "building_name", label: "Building Name", type: "text", required: false },
            { name: "village", label: "Village", type: "text", required: true },
            { name: "taluka", label: "Taluka", type: "text", required: true },
            { name: "district", label: "District", type: "text", required: true },
            { name: "land_area", label: "Land Area (Sq.ft)", type: "number", required: true },
            { name: "loan_amount_required", label: "Loan Amount Required (₹)", type: "number", required: true },
            { name: "purpose", label: "Purpose of Loan", type: "text", required: true, full: true },
            { name: "document", label: "Documents", type: "file", required: false, accept: ".pdf,.doc,.docx,image/*" },
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
    const [files, setFiles] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [formKey, setFormKey] = useState(0);
    const [trackableReference, setTrackableReference] = useState(null);
    const [sellLocation, setSellLocation] = useState({ latitude: "", longitude: "" });
    const [sellBoundaryPoints, setSellBoundaryPoints] = useState([]);

    const TRACKABLE_SERVICES = ["sell", "land-documentation"];

    if (!isAuthenticated()) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname + location.search, message: "Please log in to submit this form." }}
                replace
            />
        );
    }

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

    const handleFileChange = (name, fileList) => {
        setFiles({
            ...files,
            [name]: Array.from(fileList)
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

        const hasFileField = config.fields.some((f) => f.type === "file");
        let payload = formData;

        if (hasFileField) {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    data.append(key, value);
                }
            });
            Object.entries(files).forEach(([key, fileList]) => {
                fileList.forEach((file) => data.append(key, file));
            });
            if (serviceType === "sell") {
                if (sellLocation.latitude && sellLocation.longitude) {
                    data.append("latitude", sellLocation.latitude);
                    data.append("longitude", sellLocation.longitude);
                }
                data.append("boundary_points", JSON.stringify(sellBoundaryPoints));
            }
            payload = data;
        }

        try {
            const response = await axios.post(config.apiEndpoint, payload);

            if (TRACKABLE_SERVICES.includes(serviceType)) {
                setTrackableReference({
                    serviceType,
                    id: response.data.id,
                    mobileNo: response.data.mobile_no,
                    hadLocation: serviceType === "sell"
                        ? Boolean(sellLocation.latitude && sellLocation.longitude)
                        : undefined,
                });
                setFormData({});
                setFiles({});
                setFormKey((k) => k + 1);
                setSellLocation({ latitude: "", longitude: "" });
                setSellBoundaryPoints([]);
            } else {
                setSuccessMsg("Your inquiry has been submitted successfully!");
                setFormData({});
                setFiles({});
                setFormKey((k) => k + 1);
                setTimeout(() => navigate("/about"), 3000);
            }
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

        if (field.type === "file") {
            const selectedCount = files[field.name]?.length || 0;

            return (
                <>
                    <input
                        type="file"
                        className="form-control"
                        name={field.name}
                        accept={field.accept || "image/*"}
                        multiple={field.multiple}
                        onChange={(e) => handleFileChange(field.name, e.target.files)}
                        required={field.required}
                    />
                    {selectedCount > 0 && (
                        <span className="file-hint">{selectedCount} file(s) selected</span>
                    )}
                </>
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

                {trackableReference ? (
                    <div className="sell-reference-card">
                        <FaCheckCircle className="sell-reference-icon" />
                        {trackableReference.serviceType === "land-documentation" ? (
                            <>
                                <h3>Your request has been submitted!</h3>
                                <p>
                                    Our team will process your Land Documentation &amp; 7/12 request and upload the
                                    completed document once ready. This usually takes a short while — track its
                                    status any time using the reference below.
                                </p>
                            </>
                        ) : (
                            <>
                                <h3>Your property has been submitted!</h3>
                                <p>
                                    {trackableReference.hadLocation
                                        ? "Before your property appears for buyers and renters, our team needs to verify your documents and confirm the map location you provided."
                                        : "Before your property appears for buyers and renters, our team needs to verify your documents and add the property's map location."}
                                    {" "}This usually takes a short while — we'll keep it under review until then.
                                </p>
                            </>
                        )}
                        <div className="sell-reference-id">
                            Reference ID: <strong>#{trackableReference.id}</strong>
                        </div>
                        <p className="sell-reference-hint">
                            Save this ID — you'll need it along with your mobile number to track your
                            {trackableReference.serviceType === "land-documentation" ? " request" : " verification"} status.
                        </p>
                        <div className="sell-reference-actions">
                            <Link
                                to={`/track-submission?service=${trackableReference.serviceType}&id=${trackableReference.id}&mobile_no=${trackableReference.mobileNo}`}
                                className="submit-btn"
                            >
                                Track Your Submission
                            </Link>
                            <button
                                type="button"
                                className="btn submit-btn sell-reference-secondary"
                                onClick={() => setTrackableReference(null)}
                            >
                                Submit Another Request
                            </button>
                        </div>
                    </div>
                ) : (
                <form onSubmit={handleSubmit} key={formKey}>
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

                            const fieldClass = (field.type === "textarea" || field.type === "file" || field.full) ? "field field-full" : "field";

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

                    {serviceType === "sell" && (
                        <div className="field field-full sell-location-field">
                            <label className="form-label">
                                Property Location &amp; Boundary (Optional)
                            </label>
                            <p className="sell-location-hint">
                                Pin your property's location and trace its boundary on the map to help us
                                verify it faster. You can skip this — our team can also set it during review.
                            </p>
                            <PropertyLocationPicker
                                latitude={sellLocation.latitude}
                                longitude={sellLocation.longitude}
                                onChange={(lat, lng) => setSellLocation({ latitude: lat, longitude: lng })}
                                boundaryPoints={sellBoundaryPoints}
                                onBoundaryChange={setSellBoundaryPoints}
                            />
                        </div>
                    )}

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
                )}
            </motion.div>
        </div>
    </section>
);
};

export default ServiceForm;
