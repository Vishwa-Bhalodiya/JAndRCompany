// Free, no-API-key geo services: OpenStreetMap Nominatim (geocoding), Overpass (POI search),
// and OSRM's public demo server (routing). All are best-effort public services with rate limits —
// fine for moderate traffic, but consider self-hosting if usage grows significantly.

const NOMINATIM_URL = "https://nominatim.openstreetmap.org";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const OSRM_URL = "https://router.project-osrm.org";

export async function geocodeAddress(query) {
    const res = await fetch(
        `${NOMINATIM_URL}/search?format=json&limit=1&q=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error("Geocoding request failed");
    const data = await res.json();
    if (!data.length) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), label: data[0].display_name };
}

const OVERPASS_TAG_BY_CATEGORY = {
    school: 'amenity="school"',
    hospital: 'amenity="hospital"',
    restaurant: 'amenity="restaurant"',
    bank: 'amenity="bank"',
    bus_station: 'amenity="bus_station"',
};

export async function fetchNearbyPlaces(lat, lng, category, radiusMeters = 2000) {
    const tag = OVERPASS_TAG_BY_CATEGORY[category] || OVERPASS_TAG_BY_CATEGORY.school;
    const query = `[out:json][timeout:25];(node[${tag}](around:${radiusMeters},${lat},${lng});way[${tag}](around:${radiusMeters},${lat},${lng}););out center 15;`;

    const res = await fetch(OVERPASS_URL, {
        method: "POST",
        body: query,
    });
    if (!res.ok) throw new Error("Nearby places request failed");
    const data = await res.json();

    return (data.elements || []).map((el) => ({
        id: el.id,
        name: el.tags?.name || "Unnamed place",
        lat: el.lat ?? el.center?.lat,
        lng: el.lon ?? el.center?.lng,
    })).filter((place) => place.lat && place.lng);
}

export async function fetchRoute(originLat, originLng, destLat, destLng) {
    const url = `${OSRM_URL}/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Route request failed");
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes?.length) return null;

    const route = data.routes[0];
    return {
        coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
        distanceMeters: route.distance,
        durationSeconds: route.duration,
    };
}

export function formatDistance(meters) {
    return meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${meters.toFixed(0)} m`;
}

export function formatDuration(seconds) {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;
    return `${hours}h ${remMinutes}m`;
}

// Sum of great-circle distances between consecutive points, in meters.
export function computePathDistance(latLngs) {
    let total = 0;
    for (let i = 1; i < latLngs.length; i++) {
        total += haversineDistance(latLngs[i - 1], latLngs[i]);
    }
    return total;
}

function haversineDistance([lat1, lng1], [lat2, lng2]) {
    const R = 6371000;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Polygon area in square meters via equirectangular projection + shoelace formula.
// Accurate enough for parcel/plot-scale areas.
export function computePolygonArea(latLngs) {
    if (latLngs.length < 3) return 0;

    const R = 6371000;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const originLat = toRad(latLngs[0][0]);

    const points = latLngs.map(([lat, lng]) => {
        const x = R * toRad(lng) * Math.cos(originLat);
        const y = R * toRad(lat);
        return [x, y];
    });

    let area = 0;
    for (let i = 0; i < points.length; i++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[(i + 1) % points.length];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area / 2);
}

export function formatArea(sqMeters) {
    const acres = sqMeters / 4046.86;
    return `${sqMeters.toFixed(0)} m² (${acres.toFixed(2)} acres)`;
}
