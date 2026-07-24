/**
 * Global Application State
 * This file is the single source of truth for the application.
 */

export const appState = {

    // ===========================
    // User Settings
    // ===========================
    settings: {

        openingBalance: 0,

        currency: "IDR",

        theme: "light",

        dateFormat: "DD/MM/YYYY"

    },

    // ===========================
    // Transactions
    // ===========================
    transactions: [

        /*
        Example

        {
            id: 17218123123,

            date: "2026-07-24",

            type: "Expense",

            category: "Food",

            amount: 50000,

            description: "Lunch"
        }
        */

    ],

    // ===========================
    // Filters
    // ===========================
    filters: {

        search: "",

        type: "All",

        category: "All",

        month: "All",

        year: "All"

    },

    // ===========================
    // UI State
    // ===========================
    ui: {

        editingId: null,

        selectedTransaction: null,

        currentModal: null

    }

};