import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaGlobe, FaChevronDown, FaCheck, FaSearch } from "react-icons/fa";
import { LANGUAGES } from "./languages";
import "./GoogleTranslate.css";

const SCRIPT_ID = "google-translate-script";
const COOKIE_NAME = "googtrans";

function getCurrentLangCode() {
    const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
    return match ? match[1] : "en";
}

function setLanguageCookie(code) {
    const value = `/en/${code}`;
    const hostname = window.location.hostname;
    document.cookie = `${COOKIE_NAME}=${value};path=/`;
    document.cookie = `${COOKIE_NAME}=${value};path=/;domain=${hostname}`;
    document.cookie = `${COOKIE_NAME}=${value};path=/;domain=.${hostname}`;
}

function clearLanguageCookie() {
    const hostname = window.location.hostname;
    document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${hostname}`;
    document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.${hostname}`;
}

function GoogleTranslate() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [current, setCurrent] = useState("en");
    const [coords, setCoords] = useState(null);
    const triggerRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        setCurrent(getCurrentLangCode());

        if (!window.google || !window.google.translate) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    { pageLanguage: "en", autoDisplay: false },
                    "google_translate_element"
                );
            };

            if (!document.getElementById(SCRIPT_ID)) {
                const script = document.createElement("script");
                script.id = SCRIPT_ID;
                script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
                script.async = true;
                document.body.appendChild(script);
            }
        }
    }, []);

    const updateCoords = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + 10,
            right: window.innerWidth - rect.right,
            left: rect.left,
            width: rect.width,
        });
    };

    useLayoutEffect(() => {
        if (open) updateCoords();
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e) => {
            const clickedTrigger = triggerRef.current && triggerRef.current.contains(e.target);
            const clickedPanel = panelRef.current && panelRef.current.contains(e.target);
            if (!clickedTrigger && !clickedPanel) {
                setOpen(false);
            }
        };
        const handleEscape = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        window.addEventListener("resize", updateCoords);
        window.addEventListener("scroll", updateCoords, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            window.removeEventListener("resize", updateCoords);
            window.removeEventListener("scroll", updateCoords, true);
        };
    }, [open]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return LANGUAGES;
        return LANGUAGES.filter(
            (l) => l.name.toLowerCase().includes(q) || l.native?.toLowerCase().includes(q)
        );
    }, [query]);

    const currentLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

    const handleSelect = (code) => {
        setOpen(false);
        setQuery("");
        if (code === "en") {
            clearLanguageCookie();
        } else {
            setLanguageCookie(code);
        }
        window.location.reload();
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 991;

    const panel = open && coords && (
        <div
            ref={panelRef}
            className="lang-switcher-panel notranslate"
            role="listbox"
            style={
                isMobile
                    ? { top: coords.top, left: 16, right: 16, width: "auto" }
                    : { top: coords.top, right: coords.right, width: 280 }
            }
        >
            <div className="lang-switcher-search">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search language..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="lang-switcher-list">
                {filtered.length === 0 && (
                    <div className="lang-switcher-empty">No languages found</div>
                )}
                {filtered.map((l) => (
                    <button
                        type="button"
                        key={l.code}
                        className={`lang-switcher-item ${l.code === current ? "selected" : ""}`}
                        onClick={() => handleSelect(l.code)}
                        role="option"
                        aria-selected={l.code === current}
                    >
                        <span className="lang-switcher-item-name">
                            {l.name}
                            {l.native && <span className="lang-switcher-item-native"> · {l.native}</span>}
                        </span>
                        {l.code === current && <FaCheck className="lang-switcher-item-check" />}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="lang-switcher">
            <div id="google_translate_element" className="lang-switcher-hidden-widget"></div>

            <button
                type="button"
                ref={triggerRef}
                className={`lang-switcher-trigger ${open ? "active" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <FaGlobe />
                <span>{currentLang.name}</span>
                <FaChevronDown className={`lang-switcher-caret ${open ? "flipped" : ""}`} />
            </button>

            {panel && createPortal(panel, document.body)}
        </div>
    );
}

export default GoogleTranslate;
