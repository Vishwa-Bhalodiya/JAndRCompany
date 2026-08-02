import { API_BASE_URL } from "../config";
const BASE_URL = `${API_BASE_URL}/api/properties/`;

export async function getProperties() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    return response.json();
}

// Admin-only: includes properties still pending publish approval.
export async function getAllPropertiesAdmin() {
    const response = await fetch(`${BASE_URL}?all=true`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`
        }
    });

    if (!response.ok) {
        const error = new Error("Failed to fetch properties");
        error.status = response.status;
        throw error;
    }

    return response.json();
}

export async function getProperty(id) {
    const response = await fetch(`${BASE_URL}${id}/`);

    if (!response.ok) {
        throw new Error("Failed to fetch Property");
    }

    return response.json();
}

export async function createProperty(formData) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export async function updateProperty(id, formData) {
    const response = await fetch(`${BASE_URL}${id}/`, {
        method: "PUT",
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export async function deleteProperty(id) {
    const response = await fetch(`${BASE_URL}${id}/`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Delete failed");
    }

    return true;
}