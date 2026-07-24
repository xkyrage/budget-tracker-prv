import { loadState } from "./storage.js";

import { render } from "./ui.js";

import { initializeSettings } from "./settings.js";

import { initializeModal } from "./modal.js";

import { addTransaction } from "./transaction.js";

import {

    setSearch,

    setType,

    setCategory,

    setMonth,

    setYear

} from "./filter.js";

import { success, error } from "./toast.js";

// ====================================
// DOM
// ====================================

const transactionForm =
    document.getElementById("transactionForm");

// Search

const searchInput =
    document.getElementById("searchInput");

// Filters

const filterType =
    document.getElementById("filterType");

const filterCategory =
    document.getElementById("filterCategory");

const filterMonth =
    document.getElementById("filterMonth");

const filterYear =
    document.getElementById("filterYear");

// ====================================
// Initialize
// ====================================

loadState();

initializeSettings();

initializeModal();

bindEvents();

render();

console.log("Budget Tracker Ready");

// ====================================
// Events
// ====================================

function bindEvents() {

    // -------------------------
    // Add Transaction
    // -------------------------

    transactionForm.addEventListener(

        "submit",

        handleAddTransaction

    );

    // -------------------------
    // Search
    // -------------------------

    if (searchInput) {

        searchInput.addEventListener("input", (e) => {

            setSearch(e.target.value);

            render();

        });

    }

    // -------------------------
    // Type
    // -------------------------

    if (filterType) {

        filterType.addEventListener("change", (e) => {

            setType(e.target.value);

            render();

        });

    }

    // -------------------------
    // Category
    // -------------------------

    if (filterCategory) {

        filterCategory.addEventListener("change", (e) => {

            setCategory(e.target.value);

            render();

        });

    }

    // -------------------------
    // Month
    // -------------------------

    if (filterMonth) {

        filterMonth.addEventListener("change", (e) => {

            setMonth(e.target.value);

            render();

        });

    }

    // -------------------------
    // Year
    // -------------------------

    if (filterYear) {

        filterYear.addEventListener("change", (e) => {

            setYear(e.target.value);

            render();

        });

    }

}

// ====================================
// Add Transaction
// ====================================

function handleAddTransaction(e) {

    e.preventDefault();

    const transaction = {

        date:

            document.getElementById("date").value,

        type:

            document.getElementById("type").value,

        category:

            document.getElementById("category").value,

        amount:

            Number(

                document.getElementById("amount").value

            ),

        description:

            document.getElementById("description").value

    };

    const result =

        addTransaction(transaction);

    if (!result.success) {

        error(result.message);

        return;

    }

    success(result.message);

    transactionForm.reset();

    document
        .getElementById("modal")
        .classList.add("hidden");

    render();

}