/**
 * Analyzes transactions to identify top expense contributors
 * @param {Array<{id: any, amount: number, merchant: string, date: string}>} transactions - Array of transaction objects
 * @returns {Array<{rank: number, merchant: string, amount: number, date: string, reason: string}>}
 */
export function runFinancialAutopsy(transactions) {
  // Filter only expenses (amount < 0)
  const expenses = transactions.filter(transaction => transaction.amount < 0);

  // Sort by highest absolute amount (descending)
  const sortedExpenses = expenses.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));

  // Pick top 5
  const top5 = sortedExpenses.slice(0, 5);

  // Map to result format with rank
  return top5.map((expense, index) => ({
    rank: index + 1,
    merchant: expense.merchant,
    amount: expense.amount,
    date: expense.date,
    reason: "High impact expense"
  }));
}
