import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, LayersControl, CircleMarker, Popup } from "react-leaflet";
import { getAllPropertiesAdmin } from "../../../api/propertyApi";
import { isAuthError, handleAdminAuthError } from "../../../utils/adminAuth";
import "./GISDashboard.css";

const DEFAULT_CENTER = [23.2156, 72.6369]; // Gandhinagar, Gujarat

const STATUS_COLORS = {
    "For Sale": "#37b5d4",
    "For Rent": "#4ade80",
    "Sold": "#9ca3af",
};

function GISDashboard() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await getAllPropertiesAdmin();
            setProperties(data);
        } catch (err) {
            console.error(err);
            if (isAuthError(err.status)) {
                handleAdminAuthError();
                return;
            }
            setError("Failed to load properties.");
        } finally {
            setLoading(false);
        }
    };

    const hasCoords = (p) =>
        p.latitude !== null && p.latitude !== undefined && p.latitude !== "" &&
        p.longitude !== null && p.longitude !== undefined && p.longitude !== "";

    const withLocation = useMemo(() => properties.filter(hasCoords), [properties]);
    const withoutLocation = useMemo(() => properties.filter((p) => !hasCoords(p)), [properties]);

    const statusCounts = useMemo(() => {
        const counts = {};
        properties.forEach((p) => {
            counts[p.status] = (counts[p.status] || 0) + 1;
        });
        return counts;
    }, [properties]);

    const featuredCount = useMemo(() => properties.filter((p) => p.featured).length, [properties]);
    const pendingPublish = useMemo(() => properties.filter((p) => !p.is_approved), [properties]);

    const mapCenter = withLocation.length > 0
        ? [Number(withLocation[0].latitude), Number(withLocation[0].longitude)]
        : DEFAULT_CENTER;

    if (loading) return <h2 className="gis-status">Loading GIS dashboard...</h2>;
    if (error) return <h2 className="gis-status gis-error">{error}</h2>;

    return (
        <div className="gis-page">
            <div className="gis-header">
                <h2>GIS Dashboard</h2>
                <p>Overview of every property's map location and status.</p>
            </div>

            <div className="gis-stats">
                <div className="gis-stat-card">
                    <span className="gis-stat-value">{properties.length}</span>
                    <span className="gis-stat-label">Total Properties</span>
                </div>
                <div className="gis-stat-card gis-stat-good">
                    <span className="gis-stat-value">{withLocation.length}</span>
                    <span className="gis-stat-label">With Location</span>
                </div>
                <div className="gis-stat-card gis-stat-warn">
                    <span className="gis-stat-value">{withoutLocation.length}</span>
                    <span className="gis-stat-label">Missing Location</span>
                </div>
                <div className="gis-stat-card">
                    <span className="gis-stat-value">{featuredCount}</span>
                    <span className="gis-stat-label">Featured</span>
                </div>
                <div className="gis-stat-card gis-stat-warn">
                    <span className="gis-stat-value">{pendingPublish.length}</span>
                    <span className="gis-stat-label">Pending Publish</span>
                </div>
                {Object.entries(statusCounts).map(([status, count]) => (
                    <div className="gis-stat-card" key={status}>
                        <span className="gis-stat-value">{count}</span>
                        <span className="gis-stat-label">{status}</span>
                    </div>
                ))}
            </div>

            <div className="gis-map-wrapper">
                {withLocation.length === 0 ? (
                    <div className="gis-map-empty">No properties have a location set yet.</div>
                ) : (
                    <MapContainer center={mapCenter} zoom={10} style={{ width: "100%", height: "100%" }}>
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="Street">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Satellite">
                                <TileLayer
                                    attribution="Tiles &copy; Esri"
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                        {withLocation.map((property) => (
                            <CircleMarker
                                key={property.id}
                                center={[Number(property.latitude), Number(property.longitude)]}
                                radius={9}
                                pathOptions={{
                                    color: STATUS_COLORS[property.status] || "#37b5d4",
                                    fillColor: STATUS_COLORS[property.status] || "#37b5d4",
                                    fillOpacity: 0.8,
                                    weight: 2,
                                }}
                            >
                                <Popup>
                                    <div className="gis-popup">
                                        <h4>{property.title}</h4>
                                        <p>{property.status} &middot; {property.Property_type}</p>
                                        {!property.is_approved && (
                                            <p className="gis-popup-pending">Pending Publish</p>
                                        )}
                                        <p className="gis-popup-price">
                                            ₹ {Number(property.price).toLocaleString("en-IN")}
                                        </p>
                                        <Link to={`/Dashboard/edit-Property/${property.id}`}>Edit Property</Link>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        ))}
                    </MapContainer>
                )}
            </div>

            <div className="gis-legend">
                {Object.entries(STATUS_COLORS).map(([status, color]) => (
                    <span key={status} className="gis-legend-item">
                        <span className="gis-legend-dot" style={{ background: color }} />
                        {status}
                    </span>
                ))}
            </div>

            {withoutLocation.length > 0 && (
                <div className="gis-missing-section">
                    <h3>Properties Missing a Location ({withoutLocation.length})</h3>
                    <div className="gis-missing-list">
                        {withoutLocation.map((property) => (
                            <div className="gis-missing-item" key={property.id}>
                                <span>{property.title}</span>
                                <span className="gis-missing-location">{property.location}</span>
                                <Link to={`/Dashboard/edit-Property/${property.id}`}>Set Location</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pendingPublish.length > 0 && (
                <div className="gis-missing-section">
                    <h3>Awaiting Publish ({pendingPublish.length})</h3>
                    <div className="gis-missing-list">
                        {pendingPublish.map((property) => (
                            <div className="gis-missing-item" key={property.id}>
                                <span>{property.title}</span>
                                <span className="gis-missing-location">
                                    {hasCoords(property) ? "Location set" : "Location missing"}
                                </span>
                                <Link to="/Dashboard/properties">Review & Publish</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GISDashboard;
