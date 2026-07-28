import { useState } from "react";
import axios from "axios";
import "./PropertyInquiryForm.css";
import { API_BASE_URL } from "../../../config";

const PropertyInquiryForm = ({ property }) => {
    const [formData, setFormData] = useState({
        name: "",
        mobile_no: "",
        survey_no: property?.survey_no || "",
        location: property?.location || "",
        village_name: property?.village_name || "",
        district_name: property?.district || "",
        taluka_name: property?.taluka || ""
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
            setSuccessMsg("Your inquiry has been submitted successfully!");
            setFormData({
                name: "",
                mobile_no: "",
                survey_no: property?.survey_no || "",
                location: property?.location || "",
                village_name: property?.village_name || "",
                district_name: property?.district || "",
                taluka_name: property?.taluka || ""
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMsg("Failed to submit the inquiry. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="property-inquiry-form-wrapper mt-5">
            <h3 className="mb-4">Inquire About This Property</h3>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            
            <form onSubmit={handleSubmit} className="property-inquiry-form">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile No.</label>
                        <input type="text" className="form-control" name="mobile_no" value={formData.mobile_no} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Survey No.</label>
                        <input type="text" className="form-control" name="survey_no" value={formData.survey_no} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Location</label>
                        <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Village Name</label>
                        <input type="text" className="form-control" name="village_name" value={formData.village_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Taluka Name</label>
                        <input type="text" className="form-control" name="taluka_name" value={formData.taluka_name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">District Name</label>
                        <input type="text" className="form-control" name="district_name" value={formData.district_name} onChange={handleChange} required />
                    </div>
                </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn submit-btn w-100" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyInquiryForm;
