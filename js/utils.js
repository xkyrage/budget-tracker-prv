/**
 * ==========================================
 * General Utilities
 * ==========================================
 */

/**
 * Generate unique ID
 */
export function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Format currency
 */
export function formatCurrency(
    amount,
    currency = "IDR",
    locale = "id-ID"
) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format date
 */
export function formatDate(
    date,
    format = "DD/MM/YYYY"
) {

    if (!date) return "";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    switch (format) {

        case "YYYY-MM-DD":
            return `${year}-${month}-${day}`;

        case "MM/DD/YYYY":
            return `${month}/${day}/${year}`;

        default:
            return `${day}/${month}/${year}`;

    }

}

/**
 * Parse currency string
 */
export function parseCurrency(value) {

    return Number(
        String(value)
            .replace(/[^\d.-]/g, "")
    ) || 0;

}

/**
 * Debounce
 */
export function debounce(callback, delay = 300) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/**
 * Sort newest first
 */
export function sortNewest(transactions) {

    return [...transactions].sort(

        (a, b) =>

            new Date(b.date) -

            new Date(a.date)

    );

}

/**
 * Sort oldest first
 */
export function sortOldest(transactions) {

    return [...transactions].sort(

        (a, b) =>

            new Date(a.date) -

            new Date(b.date)

    );

}

/**
 * Sort highest amount
 */
export function sortHighest(transactions) {

    return [...transactions].sort(

        (a, b) =>

            b.amount - a.amount

    );

}

/**
 * Sort lowest amount
 */
export function sortLowest(transactions) {

    return [...transactions].sort(

        (a, b) =>

            a.amount - b.amount

    );

}

/**
 * Capitalize first letter
 */
export function capitalize(text) {

    if (!text) return "";

    return text.charAt(0).toUpperCase()

        + text.slice(1);

}

/**
 * Get unique categories
 */
export function uniqueCategories(transactions) {

    return [...new Set(

        transactions.map(

            t => t.category

        )

    )].sort();

}

/**
 * Get unique years
 */
export function uniqueYears(transactions) {

    return [...new Set(

        transactions.map(

            t =>

            new Date(t.date).getFullYear()

        )

    )].sort();

}

/**
 * Today's date
 */
export function today() {

    return new Date()

        .toISOString()

        .split("T")[0];

}

/**
 * Random color
 */
export function randomColor() {

    const colors = [

        "#3b82f6",

        "#22c55e",

        "#f59e0b",

        "#ef4444",

        "#8b5cf6",

        "#06b6d4",

        "#ec4899"

    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];

}

/**
 * Calculate summary
 */
export function calculateSummary(transactions, openingBalance = 0) {

    let income = 0;

    let expense = 0;

    transactions.forEach(t => {

        if (t.type === "Income")

            income += t.amount;

        else

            expense += t.amount;

    });

    return {

        income,

        expense,

        balance:

            openingBalance +

            income -

            expense

    };

}

/**
 * Download JSON
 */
export function downloadJSON(data, filename = "backup.json") {

    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                2

            )

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}