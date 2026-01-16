/**
 * Simulates financial scenario by removing a specific transaction
 * @param {Array<{id: any, amount: number, merchant?: string, date?: string}>} transactions - Array of transaction objects
 * @param {any} removedTransactionId - ID of the transaction to remove from calculation
 * @returns {{totalSpent: number, message: string}}
 */
export function simulateAlternateLife(transactions, removedTransactionId) {
  // Filter out the transaction with matching id (do not mutate original array)
  const filteredTransactions = transactions.filter(
    transaction => transaction.id !== removedTransactionId
  );

  // Calculate totalSpent from remaining expenses (amount < 0)
  const totalSpent = filteredTransactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return {
    totalSpent: totalSpent,
    message: `Total spent without transaction ${removedTransactionId}: ${totalSpent}`
  };
}
