import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, LayersControl, Marker, Polygon, Tooltip, useMap } from "react-leaflet";
import { FaMapMarkedAlt } from "react-icons/fa";
import { getProperties } from "../../api/propertyApi";
import { LAND_RECORDS_PORTAL_URL } from "../../config";
import "./Bhunaksha.css";

const DEFAULT_CENTER = [23.2156, 72.6369]; // Gandhinagar, Gujarat

function FlyTo({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 17, { duration: 0.8 });
        }
    }, [center]); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
}

function Bhunaksha() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getProperties()
            .then(setProperties)
            .catch((err) => {
                console.error(err);
                setError("Could not load property records.");
            })
            .finally(() => setLoading(false));
    }, []);

    const hasCoords = (p) =>
        p.latitude !== null && p.latitude !== undefined && p.latitude !== "" &&
        p.longitude !== null && p.longitude !== undefined && p.longitude !== "";

    const locations = useMemo(() => {
        const unique = new Set(properties.map((p) => p.location).filter(Boolean));
        return Array.from(unique).sort();
    }, [properties]);

    // Every property in this location, whether or not it has a map pin —
    // used for the sidebar Survey No. list so a plot never silently
    // disappears just because it hasn't been pinned yet.
    const allInLocation = useMemo(
        () => properties.filter((p) => p.location === selectedLocation),
        [properties, selectedLocation]
    );

    // Only the ones we can actually draw on the map.
    const inLocation = useMemo(
        () => allInLocation.filter(hasCoords),
        [allInLocation]
    );

    const plotsWithSurvey = useMemo(
        () => allInLocation.filter((p) => p.survey_no),
        [allInLocation]
    );

    const selectedProperty = useMemo(
        () => properties.find((p) => p.id === selectedId) || null,
        [properties, selectedId]
    );

    const mapCenter = inLocation.length > 0
        ? [Number(inLocation[0].latitude), Number(inLocation[0].longitude)]
        : DEFAULT_CENTER;

    const flyToCenter = selectedProperty && hasCoords(selectedProperty)
        ? [Number(selectedProperty.latitude), Number(selectedProperty.longitude)]
        : null;

    const handleSelectLocation = (loc) => {
        setSelectedLocation(loc);
        setSelectedId(null);
    };

    if (loading) return <h2 className="bn-status">Loading Bhunaksha...</h2>;

    return (
        <section className="bhunaksha-page">
            <div className="bn-header">
                <div>
                    <h1><FaMapMarkedAlt /> Bhunaksha</h1>
                    <p className="bn-subtitle">Land Parcel &amp; Survey Number Map</p>
                </div>
                <p className="bn-disclaimer">
                    This map shows parcel boundaries and survey numbers for properties listed on Bhumipun only.
                    It is <strong>not</strong> the official government Bhunaksha / land records portal.
                    {LAND_RECORDS_PORTAL_URL && (
                        <>
                            {" "}For official records, visit the{" "}
                            <a href={LAND_RECORDS_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                                government land records portal
                            </a>.
                        </>
                    )}
                </p>
            </div>

            {error && <p className="bn-error">{error}</p>}

            <div className="bn-layout">
                <div className="bn-sidebar">
                    <div className="bn-field">
                        <label>Location</label>
                        <select
                            value={selectedLocation}
                            onChange={(e) => handleSelectLocation(e.target.value)}
                        >
                            <option value="">Select a location...</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {selectedLocation && (
                        <div className="bn-field">
                            <label>Survey No. ({plotsWithSurvey.length})</label>
                            {plotsWithSurvey.length === 0 ? (
                                <p className="bn-empty-hint">No properties with a survey number here yet.</p>
                            ) : (
                                <ul className="bn-survey-list">
                                    {plotsWithSurvey.map((p) => (
                                        <li key={p.id}>
                                            <button
                                                className={`bn-survey-item ${selectedId === p.id ? "active" : ""}`}
                                                onClick={() => setSelectedId(p.id)}
                                            >
                                                <span className="bn-survey-no">{p.survey_no}</span>
                                                <span className="bn-survey-title">{p.title}</span>
                                                {!hasCoords(p) && (
                                                    <span className="bn-no-pin-hint">No map location set</span>
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {selectedProperty && (
                        <div className="bn-plot-info">
                            <h3>Plot Info</h3>
                            <div className="bn-plot-row"><span>Survey No.</span><strong>{selectedProperty.survey_no || "—"}</strong></div>
                            <div className="bn-plot-row"><span>Title</span><strong>{selectedProperty.title}</strong></div>
                            <div className="bn-plot-row"><span>Type</span><strong>{selectedProperty.Property_type}</strong></div>
                            <div className="bn-plot-row"><span>Status</span><strong>{selectedProperty.status}</strong></div>
                            <div className="bn-plot-row"><span>Area</span><strong>{selectedProperty.area} Sq.ft</strong></div>
                            <div className="bn-plot-row"><span>Price</span><strong>₹ {Number(selectedProperty.price).toLocaleString("en-IN")}</strong></div>
                            <Link to={`/Property/${selectedProperty.id}`} className="bn-view-link">
                                View Full Property Details
                            </Link>
                        </div>
                    )}
                </div>

                <div className="bn-map">
                    <MapContainer center={mapCenter} zoom={selectedLocation ? 14 : 7} style={{ width: "100%", height: "100%" }}>
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="Cadastral (Light)">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Street">
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

                        {inLocation.map((p) => {
                            const isSelected = p.id === selectedId;
                            const hasBoundary = Array.isArray(p.boundary_points) && p.boundary_points.length >= 3;
                            const strokeColor = isSelected ? "#c0392b" : "#3a3a3a";
                            const fillColor = isSelected ? "#e8b4ac" : "#f4e8c1";

                            return hasBoundary ? (
                                <Polygon
                                    key={p.id}
                                    positions={p.boundary_points}
                                    pathOptions={{ color: strokeColor, fillColor, fillOpacity: isSelected ? 0.6 : 0.5, weight: isSelected ? 3 : 1.5 }}
                                    eventHandlers={{ click: () => setSelectedId(p.id) }}
                                >
                                    {p.survey_no && (
                                        <Tooltip permanent direction="center" className="bn-plot-tooltip">
                                            {p.survey_no}
                                        </Tooltip>
                                    )}
                                </Polygon>
                            ) : (
                                <Marker
                                    key={p.id}
                                    position={[Number(p.latitude), Number(p.longitude)]}
                                    eventHandlers={{ click: () => setSelectedId(p.id) }}
                                >
                                    {p.survey_no && (
                                        <Tooltip permanent direction="top" offset={[0, -35]} className="bn-plot-tooltip">
                                            {p.survey_no}
                                        </Tooltip>
                                    )}
                                </Marker>
                            );
                        })}

                        {flyToCenter && <FlyTo center={flyToCenter} />}
                    </MapContainer>

                    {!selectedLocation && (
                        <div className="bn-map-hint">Select a location on the left to view its parcels.</div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Bhunaksha;
