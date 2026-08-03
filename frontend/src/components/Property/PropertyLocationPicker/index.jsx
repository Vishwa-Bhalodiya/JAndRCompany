import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap, useMapEvents } from "react-leaflet";
import { geocodeAddress, computePolygonArea, formatArea } from "../../../utils/geoServices";
import "./PropertyLocationPicker.css";

const DEFAULT_CENTER = { lat: 23.2156, lng: 72.6369 }; // Gandhinagar, Gujarat

function RecenterMap({ position, zoom }) {
    const map = useMap();
    map.setView(position, zoom, { animate: true });
    return null;
}

function ClickHandler({ onClick }) {
    useMapEvents({
        click(e) {
            onClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

function PropertyLocationPicker({ latitude, longitude, onChange, boundaryPoints = [], onBoundaryChange }) {
    const [searchText, setSearchText] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState("");
    const [recenterTick, setRecenterTick] = useState(0);
    const [drawingBoundary, setDrawingBoundary] = useState(false);

    const hasPosition = latitude !== "" && latitude !== null && latitude !== undefined
        && longitude !== "" && longitude !== null && longitude !== undefined;
    const position = hasPosition ? { lat: Number(latitude), lng: Number(longitude) } : DEFAULT_CENTER;

    // The Property model only allows 6 decimal places; raw values from Leaflet/Nominatim have more.
    const notifyChange = (lat, lng) => onChange(Number(lat.toFixed(6)), Number(lng.toFixed(6)));

    const addBoundaryPoint = (lat, lng) => {
        if (!onBoundaryChange) return;
        onBoundaryChange([...boundaryPoints, [Number(lat.toFixed(6)), Number(lng.toFixed(6))]]);
    };

    const handleMapClick = (lat, lng) => {
        if (drawingBoundary) {
            addBoundaryPoint(lat, lng);
        } else {
            notifyChange(lat, lng);
        }
    };

    const handleMarkerDragEnd = (e) => {
        const { lat, lng } = e.target.getLatLng();
        notifyChange(lat, lng);
    };

    const handleUndoBoundaryPoint = () => {
        if (!onBoundaryChange || boundaryPoints.length === 0) return;
        onBoundaryChange(boundaryPoints.slice(0, -1));
    };

    const handleClearBoundary = () => {
        if (!onBoundaryChange) return;
        onBoundaryChange([]);
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!searchText.trim()) return;

        setSearching(true);
        setSearchError("");
        try {
            const result = await geocodeAddress(searchText);
            if (result) {
                notifyChange(result.lat, result.lng);
                setRecenterTick((t) => t + 1);
            } else {
                setSearchError("No location found for that search.");
            }
        } catch (error) {
            console.error(error);
            setSearchError("Search failed. Please try again.");
        } finally {
            setSearching(false);
        }
    };

    const boundaryArea = boundaryPoints.length >= 3 ? formatArea(computePolygonArea(boundaryPoints)) : null;

    return (
        <div className="location-picker">
            <div className="location-picker-search-row">
                <input
                    type="text"
                    className="location-picker-search"
                    placeholder="Search an address to jump the map..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                />
                <button type="button" onClick={() => handleSearch()} disabled={searching}>
                    {searching ? "Searching..." : "Search"}
                </button>
            </div>
            {searchError && <p className="location-picker-error">{searchError}</p>}

            {onBoundaryChange && (
                <div className="location-picker-boundary-toolbar">
                    <button
                        type="button"
                        className={`boundary-toggle-btn ${drawingBoundary ? "active" : ""}`}
                        onClick={() => setDrawingBoundary((v) => !v)}
                    >
                        {drawingBoundary ? "Stop Drawing Boundary" : "Draw Property Boundary"}
                    </button>
                    <button
                        type="button"
                        className="boundary-secondary-btn"
                        onClick={handleUndoBoundaryPoint}
                        disabled={boundaryPoints.length === 0}
                    >
                        Undo Last Point
                    </button>
                    <button
                        type="button"
                        className="boundary-secondary-btn"
                        onClick={handleClearBoundary}
                        disabled={boundaryPoints.length === 0}
                    >
                        Clear Boundary
                    </button>
                    {boundaryArea && <span className="boundary-area-hint">Area: {boundaryArea}</span>}
                </div>
            )}

            <div className="location-picker-map">
                <MapContainer
                    center={position}
                    zoom={hasPosition ? 16 : 7}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={position}
                        draggable={!drawingBoundary}
                        eventHandlers={{ dragend: handleMarkerDragEnd }}
                    />
                    {boundaryPoints.length > 0 && (
                        <Polygon
                            positions={boundaryPoints}
                            pathOptions={{ color: "#37b5d4", fillColor: "#37b5d4", fillOpacity: 0.15, weight: 3, dashArray: "6 4" }}
                        />
                    )}
                    <ClickHandler onClick={handleMapClick} />
                    {recenterTick > 0 && <RecenterMap position={position} zoom={16} key={recenterTick} />}
                </MapContainer>
            </div>

            <p className="location-picker-hint">
                {drawingBoundary
                    ? "Click on the map to add boundary points, tracing the property's outline."
                    : hasPosition
                        ? "A location is already set — verify the pin is correct, or drag/click to correct it."
                        : "Click on the map or drag the pin to set the exact property location."}
                {hasPosition && (
                    <span className="location-picker-coords">
                        {" "}Lat: {Number(latitude).toFixed(6)}, Lng: {Number(longitude).toFixed(6)}
                    </span>
                )}
            </p>
        </div>
    );
}

export default PropertyLocationPicker;
