import { appState } from "./state.js";

/**
 * Update search text
 */
export function setSearch(search) {

    appState.filters.search = search.trim().toLowerCase();

}

/**
 * Update type filter
 */
export function setType(type) {

    appState.filters.type = type;

}

/**
 * Update category filter
 */
export function setCategory(category) {

    appState.filters.category = category;

}

/**
 * Update month filter
 */
export function setMonth(month) {

    appState.filters.month = month;

}

/**
 * Update year filter
 */
export function setYear(year) {

    appState.filters.year = year;

}

/**
 * Reset all filters
 */
export function resetFilters() {

    appState.filters = {

        search: "",

        type: "All",

        category: "All",

        month: "All",

        year: "All"

    };

}

/**
 * Return filtered transactions
 */
export function getFilteredTransactions() {

    return appState.transactions.filter(transaction => {

        // ------------------------
        // Search
        // ------------------------

        if (appState.filters.search) {

            const keyword =
                appState.filters.search;

            const found =

                transaction.category
                    .toLowerCase()
                    .includes(keyword)

                ||

                transaction.description
                    .toLowerCase()
                    .includes(keyword);

            if (!found)
                return false;

        }

        // ------------------------
        // Type
        // ------------------------

        if (

            appState.filters.type !== "All"

            &&

            transaction.type !== appState.filters.type

        ) {

            return false;

        }

        // ------------------------
        // Category
        // ------------------------

        if (

            appState.filters.category !== "All"

            &&

            transaction.category !== appState.filters.category

        ) {

            return false;

        }

        // ------------------------
        // Month
        // ------------------------

        if (

            appState.filters.month !== "All"

        ) {

            const month =

                new Date(transaction.date)
                .getMonth() + 1;

            if (

                month !==
                Number(appState.filters.month)

            ) {

                return false;

            }

        }

        // ------------------------
        // Year
        // ------------------------

        if (

            appState.filters.year !== "All"

        ) {

            const year =

                new Date(transaction.date)
                .getFullYear();

            if (

                year !==
                Number(appState.filters.year)

            ) {

                return false;

            }

        }

        return true;

    });

}