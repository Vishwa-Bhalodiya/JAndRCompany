import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    LayersControl,
    Marker,
    Polyline,
    Polygon,
    useMapEvents
} from "react-leaflet";
import {
    FaMapMarkerAlt,
    FaRulerCombined,
    FaDrawPolygon,
    FaMapMarkedAlt,
    FaRoute,
    FaTimes
} from "react-icons/fa";
import {
    fetchNearbyPlaces,
    fetchRoute,
    geocodeAddress,
    computePathDistance,
    computePolygonArea,
    formatDistance,
    formatDuration,
    formatArea
} from "../../../utils/geoServices";
import "./PropertyMap.css";

const NEARBY_CATEGORIES = [
    { key: "school", label: "Schools" },
    { key: "hospital", label: "Hospitals" },
    { key: "restaurant", label: "Restaurants" },
    { key: "bank", label: "Banks" },
    { key: "bus_station", label: "Bus Stations" }
];

function DrawClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
}

function PropertyMap({ googleMap, location, latitude, longitude }) {
    const [activeTool, setActiveTool] = useState(null);
    const [drawPoints, setDrawPoints] = useState([]);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [nearbyLoading, setNearbyLoading] = useState(false);
    const [nearbyError, setNearbyError] = useState("");
    const [routeOrigin, setRouteOrigin] = useState("");
    const [routePath, setRoutePath] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [routeLoading, setRouteLoading] = useState(false);
    const [routeError, setRouteError] = useState("");

    const hasCoords =
        latitude !== null && latitude !== undefined && latitude !== "" &&
        longitude !== null && longitude !== undefined && longitude !== "";
    const position = hasCoords ? [Number(latitude), Number(longitude)] : null;

    const resetTools = () => {
        setDrawPoints([]);
        setNearbyPlaces([]);
        setNearbyError("");
        setRoutePath(null);
        setRouteInfo(null);
        setRouteError("");
    };

    const handleToolSelect = (tool) => {
        resetTools();
        setActiveTool((current) => (current === tool ? null : tool));
    };

    const handleMapClick = (lat, lng) => {
        if (activeTool === "distance" || activeTool === "area") {
            setDrawPoints((points) => [...points, [lat, lng]]);
        }
    };

    const handleNearbyCategory = async (category) => {
        if (!position) return;
        setNearbyLoading(true);
        setNearbyError("");
        setNearbyPlaces([]);
        try {
            const places = await fetchNearbyPlaces(position[0], position[1], category);
            setNearbyPlaces(places);
        } catch (error) {
            console.error(error);
            setNearbyError("Could not load nearby places. Please try again.");
        } finally {
            setNearbyLoading(false);
        }
    };

    const handleRouteSubmit = async (e) => {
        e.preventDefault();
        if (!routeOrigin.trim() || !position) return;

        setRouteLoading(true);
        setRouteError("");
        setRoutePath(null);
        setRouteInfo(null);

        try {
            const origin = await geocodeAddress(routeOrigin);
            if (!origin) {
                setRouteError("Could not find that starting location.");
                return;
            }
            const route = await fetchRoute(origin.lat, origin.lng, position[0], position[1]);
            if (!route) {
                setRouteError("Could not find a route from that location.");
                return;
            }
            setRoutePath(route.coordinates);
            setRouteInfo({
                distance: formatDistance(route.distanceMeters),
                duration: formatDuration(route.durationSeconds)
            });
        } catch (error) {
            console.error(error);
            setRouteError("Could not find a route from that location.");
        } finally {
            setRouteLoading(false);
        }
    };

    const measurementLabel = () => {
        if (drawPoints.length < 2) return null;
        if (activeTool === "distance") {
            return `Distance: ${formatDistance(computePathDistance(drawPoints))}`;
        }
        if (activeTool === "area" && drawPoints.length >= 3) {
            return `Area: ${formatArea(computePolygonArea(drawPoints))}`;
        }
        return null;
    };

    return (
        <section className="Property-map">
            <h2>Property Location</h2>
            <p className="map-address">
                <FaMapMarkerAlt />
                {location || "Location not available"}
            </p>

            {hasCoords && (
                <div className="map-toolbar">
                    <button
                        type="button"
                        className={`map-tool-btn ${activeTool === "distance" ? "active" : ""}`}
                        onClick={() => handleToolSelect("distance")}
                    >
                        <FaRulerCombined /> Measure Distance
                    </button>
                    <button
                        type="button"
                        className={`map-tool-btn ${activeTool === "area" ? "active" : ""}`}
                        onClick={() => handleToolSelect("area")}
                    >
                        <FaDrawPolygon /> Measure Area
                    </button>
                    <button
                        type="button"
                        className={`map-tool-btn ${activeTool === "nearby" ? "active" : ""}`}
                        onClick={() => handleToolSelect("nearby")}
                    >
                        <FaMapMarkedAlt /> Nearby Places
                    </button>
                    <button
                        type="button"
                        className={`map-tool-btn ${activeTool === "route" ? "active" : ""}`}
                        onClick={() => handleToolSelect("route")}
                    >
                        <FaRoute /> Directions
                    </button>
                    {activeTool && (
                        <button type="button" className="map-tool-btn map-tool-clear" onClick={resetTools}>
                            <FaTimes /> Clear
                        </button>
                    )}
                </div>
            )}

            {(activeTool === "distance" || activeTool === "area") && (
                <div className="map-panel">
                    <p className="map-panel-hint">
                        Click on the map to add points.{" "}
                        {activeTool === "area" ? "Add at least 3 points to measure an area." : ""}
                    </p>
                    {measurementLabel() && (
                        <p className="map-panel-hint">
                            <strong>{measurementLabel()}</strong>
                        </p>
                    )}
                </div>
            )}

            {activeTool === "nearby" && (
                <div className="map-panel">
                    <div className="nearby-categories">
                        {NEARBY_CATEGORIES.map((cat) => (
                            <button key={cat.key} type="button" onClick={() => handleNearbyCategory(cat.key)}>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    {nearbyLoading && <p className="map-panel-hint">Searching nearby...</p>}
                    {nearbyError && <p className="map-panel-error">{nearbyError}</p>}
                    {!nearbyLoading && nearbyPlaces.length > 0 && (
                        <ul className="nearby-list">
                            {nearbyPlaces.map((place) => (
                                <li key={place.id}>{place.name}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {activeTool === "route" && (
                <div className="map-panel">
                    <form className="route-form" onSubmit={handleRouteSubmit}>
                        <input
                            type="text"
                            placeholder="Enter your starting location or address"
                            value={routeOrigin}
                            onChange={(e) => setRouteOrigin(e.target.value)}
                        />
                        <button type="submit" disabled={routeLoading}>
                            {routeLoading ? "Finding..." : "Get Directions"}
                        </button>
                    </form>
                    {routeError && <p className="map-panel-error">{routeError}</p>}
                    {routeInfo && (
                        <p className="map-panel-hint">
                            Distance: <strong>{routeInfo.distance}</strong> &middot; Duration:{" "}
                            <strong>{routeInfo.duration}</strong>
                        </p>
                    )}
                </div>
            )}

            <div className="map-container">
                {hasCoords ? (
                    <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
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

                        <Marker position={position} />

                        <DrawClickHandler onMapClick={handleMapClick} />

                        {activeTool === "distance" && drawPoints.length > 1 && (
                            <Polyline positions={drawPoints} pathOptions={{ color: "#37b5d4", weight: 4 }} />
                        )}

                        {activeTool === "area" && drawPoints.length > 2 && (
                            <Polygon
                                positions={drawPoints}
                                pathOptions={{ color: "#37b5d4", fillColor: "#37b5d4", fillOpacity: 0.2, weight: 3 }}
                            />
                        )}

                        {activeTool === "nearby" &&
                            nearbyPlaces.map((place) => (
                                <Marker key={place.id} position={[place.lat, place.lng]} title={place.name} />
                            ))}

                        {activeTool === "route" && routePath && (
                            <Polyline positions={routePath} pathOptions={{ color: "#37b5d4", weight: 4 }} />
                        )}
                    </MapContainer>
                ) : googleMap ? (
                    <iframe title="Google Map" src={googleMap} loading="lazy" allowFullScreen />
                ) : (
                    <div className="no-map">
                        <h4>Map Not Available</h4>
                    </div>
                )}
            </div>
        </section>
    );
}

export default PropertyMap;
