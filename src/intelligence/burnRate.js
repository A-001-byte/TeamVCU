/**
 * Calculates burn rate based on monthly expenses and savings
 * @param {number} monthlyExpense - Monthly expense amount
 * @param {number} savings - Current savings amount
 * @returns {{monthsLeft: number, warning: "Safe" | "Caution" | "Critical"}}
 */
export function calculateBurnRate(monthlyExpense, savings) {
  // Calculate months left
  const monthsLeft = savings / monthlyExpense;

  // Determine warning level
  let warning;
  if (monthsLeft < 3) {
    warning = "Critical";
  } else if (monthsLeft < 6) {
    warning = "Caution";
  } else {
    warning = "Safe";
  }

  return {
    monthsLeft: Math.round(monthsLeft * 10) / 10, // Round to 1 decimal place
    warning: warning
  };
}
