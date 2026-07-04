const BASE_URL = "http://127.0.0.1:8000/api/properties/";

export async function getProperties() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch properties");
    }

    return response.json();
}

export async function getProperty(id) {
    const response = await fetch(`${BASE_URL}${id}/`);

    if (!response.ok) {
        throw new Error("Failed to fetch property");
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