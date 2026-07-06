import { useEffect, useState } from "react";
import "./ManageInquiries.css";

function ManageInquiries() {

    const [inquiries, setInquiries] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/inquiries/"
            );

            const data = await response.json();

            setInquiries(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const markContacted = async (item) => {

        await fetch(
            `http://127.0.0.1:8000/api/inquiries/${item.id}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contacted: !item.contacted
                })
            }
        );

        fetchInquiries();

    };

    const deleteInquiry = async (id) => {

        if (!window.confirm("Delete this inquiry?")) return;

        await fetch(
            `http://127.0.0.1:8000/api/inquiries/${id}/`,
            {
                method: "DELETE"
            }
        );

        fetchInquiries();

    };

    const filtered = inquiries.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <h2>Loading...</h2>;

    return (

        <div className="mi-page">

            <div className="mi-header">

                <div>

                    <h2>Manage Inquiries</h2>

                    <p>Customer Leads & Contact Requests</p>

                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <table className="mi-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filtered.map((item)=>(

                        <tr key={item.id}>

                            <td>{item.name}</td>

                            <td>{item.email}</td>

                            <td>{item.phone}</td>

                            <td>{item.subject}</td>

                            <td>

                                <span
                                    className={
                                        item.contacted
                                        ? "badge contacted"
                                        : "badge pending"
                                    }
                                >

                                    {item.contacted
                                    ? "Contacted"
                                    : "Pending"}

                                </span>

                            </td>

                            <td>
                                {new Date(item.created_at).toLocaleDateString()}
                            </td>

                            <td>

                                <button
                                    className="contact-btn"
                                    onClick={()=>markContacted(item)}
                                >
                                    Status
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={()=>deleteInquiry(item.id)}
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

export default ManageInquiries;