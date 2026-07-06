import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
    try {
        const token = localStorage.getItem("access");

        const res = await fetch(
            "http://127.0.0.1:8000/api/favorites/",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            console.error("API Error:", res.status);
            setFavorites([]);
            return;
        }

        const data = await res.json();

        setFavorites(Array.isArray(data) ? data : []);

    } catch (err) {
        console.error(err);
        setFavorites([]);
    } finally {
        setLoading(false);
    }
};

    if (loading) return <h3>Loading...</h3>;

    return (
        <section className="favorites-page">

            <div className="container">

                <div className="favorites-header">

                    <h2>Saved Properties</h2>

                    <p>
                        Your favorite properties are saved here.
                    </p>

                </div>

                <div className="row">

                    {favorites.length === 0 ? (

                        <div className="col-12 text-center">

                            <h4 className="text-light">
                                No saved properties found.
                            </h4>

                        </div>

                    ) : (

                        favorites.map((fav) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={fav.id}
                            >

                                <div className="favorite-card">

                                    <div className="favorite-image">

                                        <img
                                            src={
                                                fav.property.images?.length
                                                    ? `http://127.0.0.1:8000${fav.property.images[0].image}`
                                                    : "/placeholder.jpg"
                                            }
                                            alt={fav.property.title}
                                        />

                                        <span className="favorite-status">
                                            {fav.property.status}
                                        </span>

                                    </div>

                                    <div className="favorite-content">

                                        <h3>
                                            {fav.property.title}
                                        </h3>

                                        <p className="favorite-location">
                                            📍 {fav.property.location}
                                        </p>

                                        <h2 className="favorite-price">
                                            ₹ {Number(fav.property.price).toLocaleString("en-IN")}
                                        </h2>

                                        <div className="favorite-info">

                                            <span>
                                                📐 {fav.property.area} Sq.ft
                                            </span>

                                            <span>
                                                🏡 {fav.property.property_type}
                                            </span>

                                        </div>

                                        <Link
                                            to={`/property/${fav.property.id}`}
                                            className="favorite-details-btn"
                                        >
                                            View Details
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </section>
    );
}

export default Favorites;