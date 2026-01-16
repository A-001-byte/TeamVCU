/**
 * Builds a financial twin model from transactions, income, and savings data.
 * 
 * @param {Array} transactions - Array of transaction objects with { id, amount, date }
 * @param {number} income - Monthly income
 * @param {number} savings - Current savings amount
 * @returns {Object} Financial twin object with monthlyExpense, runwayMonths, and risk
 */
export function buildFinancialTwin(transactions, income, savings) {
  // Filter expenses (amount < 0)
  const expenses = transactions.filter(t => t.amount < 0);
  
  if (expenses.length === 0) {
    return {
      monthlyExpense: 0,
      runwayMonths: savings > 0 ? Infinity : 0,
      risk: savings > 0 ? "LOW" : "HIGH"
    };
  }
  
  // Group expenses by month
  const expensesByMonth = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!expensesByMonth[monthKey]) {
      expensesByMonth[monthKey] = 0;
    }
    
    // Sum absolute values of expenses (since amounts are negative)
    expensesByMonth[monthKey] += Math.abs(expense.amount);
  });
  
  // Calculate average monthly expense
  const monthlyExpense = Object.values(expensesByMonth).reduce((sum, monthTotal) => sum + monthTotal, 0) / Object.keys(expensesByMonth).length;
  
  // Calculate runway months
  const runwayMonths = monthlyExpense > 0 ? savings / monthlyExpense : (savings > 0 ? Infinity : 0);
  
  // Classify risk
  let risk;
  if (runwayMonths < 2) {
    risk = "HIGH";
  } else if (runwayMonths < 6) {
    risk = "MEDIUM";
  } else {
    risk = "LOW";
  }
  
  return {
    monthlyExpense: Math.round(monthlyExpense * 100) / 100, // Round to 2 decimals
    runwayMonths: Math.round(runwayMonths * 10) / 10, // Round to 1 decimal
    risk: risk
  };
}
