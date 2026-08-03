export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://jandrcompany.onrender.com" : "http://127.0.0.1:8000");

// Official government land records / Bhunaksha-style portal for this state.
// Set VITE_LAND_RECORDS_PORTAL_URL once the correct portal URL is confirmed
// (e.g. https://bhunaksha.<state>.gov.in or https://anyror.gujarat.gov.in).
// Left blank until then — the "View Official Land Records" link only
// renders when this is set, so nothing broken shows up in the meantime.
export const LAND_RECORDS_PORTAL_URL = import.meta.env.VITE_LAND_RECORDS_PORTAL_URL || "";

// AnyROR (or your state's equivalent Record of Rights / 7-12 portal) — a
// separate system from the cadastral map portal above. Used as a manual
// reference link for admin staff fulfilling Land Documentation & 7/12
// requests; not an automated data-fetch integration (AnyROR has no public
// API and automating against it would violate its terms of service).
export const ANYROR_PORTAL_URL = import.meta.env.VITE_ANYROR_PORTAL_URL || "";
