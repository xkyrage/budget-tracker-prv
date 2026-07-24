import { appState } from "./state.js";
import { getFilteredTransactions } from "./filter.js";

// ======================================
// Currency
// ======================================

export function formatCurrency(amount) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: appState.settings.currency,

        maximumFractionDigits: 0

    }).format(amount);

}

// ======================================
// Date
// ======================================

export function formatDate(date) {

    if (!date) return "";

    const d = new Date(date);

    switch (appState.settings.dateFormat) {

        case "MM/DD/YYYY":
            return d.toLocaleDateString("en-US");

        case "YYYY-MM-DD":
            return date;

        default:
            return d.toLocaleDateString("id-ID");

    }

}

// ======================================
// Category Icons
// ======================================

export function getCategoryIcon(category) {

    const icons = {

        Salary: "💼",

        Food: "🍔",

        Coffee: "☕",

        Fuel: "⛽",

        Shopping: "🛍️",

        Transport: "🚗",

        Entertainment: "🎮",

        Health: "❤️",

        Internet: "🌐",

        Electricity: "⚡",

        Water: "💧",

        Investment: "📈",

        Gift: "🎁",

        Rent: "🏠",

        Motorcycle: "🏍️",

        Others: "📦"

    };

    return icons[category] || "📦";

}

// ======================================
// Dashboard
// ======================================

export function renderDashboard() {

    let income = 0;

    let expense = 0;

    appState.transactions.forEach(t => {

        if (t.type === "Income")

            income += t.amount;

        else

            expense += t.amount;

    });

    const balance =

        appState.settings.openingBalance +

        income -

        expense;

    document.getElementById("balance").textContent =
        formatCurrency(balance);

    document.getElementById("income").textContent =
        formatCurrency(income);

    document.getElementById("expense").textContent =
        formatCurrency(expense);

}

// ======================================
// Transaction List
// ======================================

export function renderTransactions() {

    const list =
        document.getElementById("transactionList");

    const transactions =
        getFilteredTransactions();

    list.innerHTML = "";

    if (transactions.length === 0) {

        list.innerHTML = `

            <div class="empty">

                No transaction found.

            </div>

        `;

        return;

    }

    transactions

        .sort((a, b) =>

            new Date(b.date) -

            new Date(a.date)

        )

        .forEach(transaction => {

            list.appendChild(

                createTransactionCard(transaction)

            );

        });

}

// ======================================
// Transaction Card
// ======================================

function createTransactionCard(transaction) {

    const card = document.createElement("div");

    card.className = "transaction-card";

    card.dataset.id = transaction.id;

    card.innerHTML = `

        <div class="transaction-left">

            <div class="transaction-icon">

                ${getCategoryIcon(transaction.category)}

            </div>

            <div>

                <div class="transaction-title">

                    ${transaction.category}

                </div>

                <div class="transaction-date">

                    ${formatDate(transaction.date)}

                </div>

                <div class="transaction-description">

                    ${transaction.description || ""}

                </div>

            </div>

        </div>

        <div class="transaction-right">

            <span class="badge ${transaction.type.toLowerCase()}">

                ${transaction.type}

            </span>

            <div class="transaction-amount ${transaction.type.toLowerCase()}">

                ${transaction.type === "Income" ? "+" : "-"}

                ${formatCurrency(transaction.amount)}

            </div>

            <div class="transaction-actions">

                <button
                    class="edit-btn"
                    data-id="${transaction.id}">

                    ✏️

                </button>

                <button
                    class="delete-btn"
                    data-id="${transaction.id}">

                    🗑️

                </button>

            </div>

        </div>

    `;

    return card;

}

// ======================================
// Render App
// ======================================

export function render() {

    renderDashboard();

    renderTransactions();

}