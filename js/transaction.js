import { appState } from "./state.js";
import { saveState } from "./storage.js";

/**
 * Validate transaction
 */
export function validateTransaction(transaction) {

    if (!transaction.date)
        return "Date is required.";

    if (!transaction.category.trim())
        return "Category is required.";

    if (transaction.amount <= 0)
        return "Amount must be greater than zero.";

    return null;
}

/**
 * Add transaction
 */
export function addTransaction(transaction) {

    const error = validateTransaction(transaction);

    if (error)
        return {
            success: false,
            message: error
        };

    transaction.id = Date.now();

    appState.transactions.push(transaction);

    saveState();

    return {
        success: true,
        message: "Transaction added."
    };

}

/**
 * Update transaction
 */
export function updateTransaction(id, updatedTransaction) {

    const index = appState.transactions.findIndex(
        t => t.id === id
    );

    if (index === -1)
        return {
            success: false,
            message: "Transaction not found."
        };

    const error = validateTransaction(updatedTransaction);

    if (error)
        return {
            success: false,
            message: error
        };

    updatedTransaction.id = id;

    appState.transactions[index] = updatedTransaction;

    saveState();

    return {
        success: true,
        message: "Transaction updated."
    };

}

/**
 * Delete transaction
 */
export function deleteTransaction(id) {

    const index = appState.transactions.findIndex(
        t => t.id === id
    );

    if (index === -1)
        return {
            success: false,
            message: "Transaction not found."
        };

    appState.transactions.splice(index, 1);

    saveState();

    return {
        success: true,
        message: "Transaction deleted."
    };

}

/**
 * Get transaction by ID
 */
export function getTransaction(id) {

    return appState.transactions.find(
        t => t.id === id
    );

}

/**
 * Get all transactions
 */
export function getTransactions() {

    return appState.transactions;

}