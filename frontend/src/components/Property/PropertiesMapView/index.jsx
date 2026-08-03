import { MapContainer, TileLayer, LayersControl, Marker, Popup, Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "./PropertiesMapView.css";

const DEFAULT_CENTER = [23.2156, 72.6369]; // Gandhinagar, Gujarat

function PropertiesMapView({ properties }) {
    const navigate = useNavigate();

    const withCoords = properties.filter(
        (p) => p.latitude !== null && p.latitude !== undefined && p.latitude !== "" &&
               p.longitude !== null && p.longitude !== undefined && p.longitude !== ""
    );

    const center = withCoords.length > 0
        ? [Number(withCoords[0].latitude), Number(withCoords[0].longitude)]
        : DEFAULT_CENTER;

    const goToProperty = (property) => {
        navigate(`/Property/${property.id}`);
    };

    return (
        <div className="properties-map-view">
            {withCoords.length === 0 ? (
                <div className="properties-map-empty">
                    No properties have a map location set yet.
                </div>
            ) : (
                <MapContainer center={center} zoom={11} style={{ width: "100%", height: "100%" }}>
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

                    {withCoords.map((property) => (
                        <Marker
                            key={property.id}
                            position={[Number(property.latitude), Number(property.longitude)]}
                        >
                            {property.survey_no && (
                                <Tooltip permanent direction="top" offset={[0, -35]} className="survey-no-tooltip">
                                    Survey No: {property.survey_no}
                                </Tooltip>
                            )}
                            <Popup>
                                <div className="map-popup">
                                    <h4>{property.title}</h4>
                                    <p>{property.location}</p>
                                    <p className="map-popup-price">
                                        ₹ {Number(property.price).toLocaleString("en-IN")}
                                    </p>
                                    <button onClick={() => goToProperty(property)}>View Details</button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            )}
        </div>
    );
}

export default PropertiesMapView;
