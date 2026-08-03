import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./PropertyInquiryForm.css";
import { API_BASE_URL } from "../../../config";

const PropertyInquiryForm = ({ property }) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile_no: "",
        buy_rent: property?.status === "For Rent" ? "Rent" : "Buy",
        location: property?.location || "",
        village_name: property?.village_name || "",
        district_name: property?.district || "",
        taluka_name: property?.taluka || "",
        property: property?.id || null
    });
    
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

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
            await axios.post(`${API_BASE_URL}/api/services/buy-rent/`, formData);

            setSuccessMsg("Your inquiry has been submitted successfully! Our team will get back to you shortly.");
            setFormData({
                name: "",
                mobile_no: "",
                buy_rent: property?.status === "For Rent" ? "Rent" : "Buy",
                location: property?.location || "",
                village_name: property?.village_name || "",
                district_name: property?.district || "",
                taluka_name: property?.taluka || "",
                property: property?.id || null
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMsg("Failed to submit the inquiry. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const formTitle = property?.status === "For Rent" ? "Inquire to Rent This Property" : "Inquire to Buy This Property";

    return (
        <motion.div
            className="property-inquiry-form-wrapper mt-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="form-header">
                <h3>{formTitle}</h3>
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

            <form onSubmit={handleSubmit} className="property-inquiry-form">
                <div className="form-grid">
                    <div className="field">
                        <label className="form-label">Name<span className="required-mark">*</span></label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
                    </div>
                    <div className="field">
                        <label className="form-label">Mobile No.<span className="required-mark">*</span></label>
                        <input type="text" className="form-control" name="mobile_no" value={formData.mobile_no} onChange={handleChange} placeholder="Enter mobile no." required />
                    </div>

                    <div className="field">
                        <label className="form-label">Village Name<span className="required-mark">*</span></label>
                        <input type="text" className="form-control" name="village_name" value={formData.village_name} onChange={handleChange} placeholder="Enter village name" required />
                    </div>
                    <div className="field">
                        <label className="form-label">Taluka Name<span className="required-mark">*</span></label>
                        <input type="text" className="form-control" name="taluka_name" value={formData.taluka_name} onChange={handleChange} placeholder="Enter taluka name" required />
                    </div>
                    <div className="field field-full">
                        <label className="form-label">District Name<span className="required-mark">*</span></label>
                        <input type="text" className="form-control" name="district_name" value={formData.district_name} onChange={handleChange} placeholder="Enter district name" required />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default PropertyInquiryForm;
