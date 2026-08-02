// Shared helper for admin dashboard pages. The admin JWT access token expires
// after 60 minutes and this app has no silent-refresh flow, so any admin page
// can suddenly start getting 401/403s mid-session. Without this, pages were
// silently showing empty state ("No properties found") with no indication
// the session had expired.

export function isAuthError(status) {
    return status === 401 || status === 403;
}

export function handleAdminAuthError() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    alert("Your session has expired. Please log in again.");
    window.location.href = "/login";
}
