import { appState } from "./state.js";

const STORAGE_KEY = "budgetTracker";

export function saveState() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(appState)
    );

}

export function loadState() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    Object.assign(
        appState,
        JSON.parse(saved)
    );

}