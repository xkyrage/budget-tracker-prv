import { appState } from "./state.js";
import { saveState } from "./storage.js";
import { render } from "./ui.js";

// =========================
// DOM
// =========================

const settingsModal =
    document.getElementById("settingsModal");

const settingsBtn =
    document.getElementById("settingsBtn");

const closeSettingsBtn =
    document.getElementById("closeSettings");

const settingsForm =
    document.getElementById("settingsForm");

// =========================
// Initialize
// =========================

export function initializeSettings() {

    populateSettingsForm();

    bindSettingsEvents();

    applyTheme();

}

// =========================
// Event Binding
// =========================

function bindSettingsEvents() {

    settingsBtn.addEventListener("click", openSettings);

    closeSettingsBtn.addEventListener("click", closeSettings);

    settingsForm.addEventListener("submit", saveSettings);

}

// =========================
// Modal
// =========================

function openSettings() {

    populateSettingsForm();

    settingsModal.classList.remove("hidden");

}

function closeSettings() {

    settingsModal.classList.add("hidden");

}

// =========================
// Save
// =========================

function saveSettings(event) {

    event.preventDefault();

    appState.settings.openingBalance = Number(
        document.getElementById("openingBalance").value
    );

    appState.settings.currency =
        document.getElementById("currency").value;

    appState.settings.theme =
        document.getElementById("theme").value;

    appState.settings.dateFormat =
        document.getElementById("dateFormat").value;

    saveState();

    applyTheme();

    closeSettings();

    render();

}

// =========================
// Populate Form
// =========================

export function populateSettingsForm() {

    document.getElementById("openingBalance").value =
        appState.settings.openingBalance;

    document.getElementById("currency").value =
        appState.settings.currency;

    document.getElementById("theme").value =
        appState.settings.theme;

    document.getElementById("dateFormat").value =
        appState.settings.dateFormat;

}

// =========================
// Theme
// =========================

export function applyTheme() {

    document.body.classList.toggle(
        "dark",
        appState.settings.theme === "dark"
    );

}

// =========================
// Helpers
// =========================

export function getOpeningBalance() {

    return appState.settings.openingBalance;

}

export function getCurrency() {

    return appState.settings.currency;

}

export function getTheme() {

    return appState.settings.theme;

}

export function getDateFormat() {

    return appState.settings.dateFormat;

}