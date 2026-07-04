import "./VisitForm.css";

import { useState } from "react";

function VisitForm() {

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        landType: "",
        visitDate: "",
        message: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

        alert("Inquiry Submitted Successfully!");

    };

    return (

        <div className="visit-form">

            <h3>

                Schedule Site Visit

            </h3>

            <p>

                Interested in this property? Fill out the form and our team
                will contact you shortly.

            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <select
                    name="landType"
                    value={formData.landType}
                    onChange={handleChange}
                    required
                >

                    <option value="">

                        Select Land Type

                    </option>

                    <option>

                        Residential Plot

                    </option>

                    <option>

                        Commercial Plot

                    </option>

                    <option>

                        Agricultural Land

                    </option>

                    <option>

                        Industrial Land

                    </option>

                    <option>

                        Farm House Land

                    </option>

                </select>

                <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    required
                />

                <textarea
                    rows="5"
                    name="message"
                    placeholder="Tell us your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                />

                <button type="submit">

                    Submit Inquiry

                </button>

            </form>

        </div>

    );

}

export default VisitForm;