/**
 * Modal Manager
 * Handles opening and closing all application modals.
 */

import { appState } from "./state.js";

// ==============================
// DOM
// ==============================

const transactionModal = document.getElementById("modal");
const settingsModal = document.getElementById("settingsModal");

const addBtn = document.getElementById("addBtn");

const closeTransactionBtn = document.getElementById("closeBtn");
const closeSettingsBtn = document.getElementById("closeSettings");

const transactionForm = document.getElementById("transactionForm");

// ==============================
// Initialize
// ==============================

export function initializeModal() {

    bindEvents();

}

// ==============================
// Events
// ==============================

function bindEvents() {

    addBtn.addEventListener(
        "click",
        openTransactionModal
    );

    closeTransactionBtn.addEventListener(
        "click",
        closeTransactionModal
    );

    closeSettingsBtn.addEventListener(
        "click",
        closeSettingsModal
    );

    // Close when clicking outside

    window.addEventListener("click", (event) => {

        if (event.target === transactionModal)
            closeTransactionModal();

        if (event.target === settingsModal)
            closeSettingsModal();

    });

    // ESC key

    window.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeAllModals();

        }

    });

}

// ==============================
// Transaction Modal
// ==============================

export function openTransactionModal() {

    appState.ui.currentModal = "transaction";

    transactionModal.classList.remove("hidden");

}

export function closeTransactionModal() {

    transactionModal.classList.add("hidden");

    transactionForm.reset();

    appState.ui.editingId = null;

    appState.ui.currentModal = null;

}

// ==============================
// Settings Modal
// ==============================

export function openSettingsModal() {

    appState.ui.currentModal = "settings";

    settingsModal.classList.remove("hidden");

}

export function closeSettingsModal() {

    settingsModal.classList.add("hidden");

    appState.ui.currentModal = null;

}

// ==============================
// Helpers
// ==============================

export function closeAllModals() {

    closeTransactionModal();

    closeSettingsModal();

}

export function isModalOpen() {

    return appState.ui.currentModal !== null;

}