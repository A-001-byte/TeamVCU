import React from 'react';
import './FinancialSnapshot.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Lightbulb } from 'lucide-react';

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
};

// Correctly ordered colors to match the desired output
const COLORS = ['#f97316', '#3b82f6', '#ef4444', '#10b981', '#8b5cf6'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].name} : ${formatCurrency(payload[0].value)}`}</p>
                <p className="intro">{`Percentage: ${(payload[0].percent * 100).toFixed(0)}%`}</p>
            </div>
        );
    }
    return null;
};

const FinancialHealthTips = ({ income, expenses, savingsRate, expenseCategories }) => {
    const tips = [];
    const highestExpense = [...expenseCategories].sort((a, b) => b.amount - a.amount)[0];

    if (savingsRate > 20) {
        tips.push({ icon: '👍', text: `Excellent savings rate of ${savingsRate}%! You are doing a great job of building wealth.` });
    } else if (savingsRate < 10) {
        tips.push({ icon: '🤔', text: `Your savings rate is ${savingsRate}%. Consider reviewing your non-essential spending to boost this.` });
    }

    if (highestExpense.amount > expenses * 0.3) {
        tips.push({ icon: '💡', text: `Your spending on "${highestExpense.name}" is significant. Small cutbacks here could lead to big savings.` });
    }

    if (expenses / income < 0.5) {
        tips.push({ icon: '✅', text: "You're spending less than 50% of your income on expenses, which is a great sign of financial health." });
    }

    return (
        <div className="summary-card health-tips-card">
            <h3><Lightbulb size={20} /> Financial Health Tips</h3>
            <ul className="health-tips-list">
                {tips.map((tip, i) => (
                    <li key={i} className="health-tip">
                        <span className="tip-icon">{tip.icon}</span>
                        <span>{tip.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function FinancialSnapshot() {
    const income = 85000;
    const expenses = 52400;
    const netBalance = income - expenses;
    const totalEmi = 18500;
    const savingsAmount = 14100;
    const savingsRate = 16.6;

    const primaryIncomeSources = [
        { name: "Salary", amount: 60000 },
        { name: "Freelance Projects", amount: 15000 },
        { name: "Investment Returns", amount: 5000 },
        { name: "Rental Income", amount: 5000 },
    ];

    const expenseCategories = [
        { name: "Entertainment", amount: 6800 },
        { name: "Food & Dining", amount: 18500 },
        { name: "Shopping", amount: 12400 },
        { name: "Transportation", amount: 8500 },
        { name: "Utilities", amount: 6200 },
    ];

    const emiObligations = [
        { name: "Home Loan", amount: 12000 },
        { name: "Car Loan", amount: 4500 },
        { name: "Credit Card", amount: 2000 },
    ];

    return (
        <div className="financial-snapshot-page">
            <header className="snapshot-header">
                <h1 className="snapshot-title">Financial Snapshot</h1>
                <p className="snapshot-subtitle">A detailed, human-crafted overview of your financial health.</p>
            </header>
            <div className="snapshot-grid">
                {/* Cards will be refactored into components later */}
                <div className="summary-card income-card">
                    <h3>Income Summary</h3>
                    <h2>{formatCurrency(income)}</h2>
                    <ul>
                        {primaryIncomeSources.map(s => <li key={s.name}><span>{s.name}</span> <span>{formatCurrency(s.amount)}</span></li>)}
                    </ul>
                </div>

                <div className="summary-card expense-card">
                    <h3>Expense Summary</h3>
                    <h2>{formatCurrency(expenses)}</h2>
                    <p>An overview of your monthly spending.</p>
                </div>

                <div className="summary-card net-balance-card">
                    <h3>Net Balance</h3>
                    <h2>{formatCurrency(netBalance)}</h2>
                    <p>Your take-home after all expenses.</p>
                </div>

                <div className="summary-card expense-breakdown-card">
                    <h3>Expense Breakdown</h3>
                    <div className="expense-chart-container">
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={expenseCategories} dataKey="amount" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} isAnimationActive={true}>
                                        {expenseCategories.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="chart-center-text">
                                <div className="chart-total-amount">{formatCurrency(expenses)}</div>
                                <div className="chart-total-label">Total Expenses</div>
                            </div>
                        </div>
                        <div className="legend-wrapper">
                            <Legend layout="vertical" verticalAlign="middle" align="left" iconType="circle" payload={expenseCategories.map((item, index) => ({ value: item.name, type: 'circle', id: item.name, color: COLORS[index % COLORS.length] }))} />
                        </div>
                    </div>
                </div>

                <div className="summary-card emi-card">
                    <h3>EMI Summary</h3>
                    <h2>{formatCurrency(totalEmi)}</h2>
                    <ul>
                        {emiObligations.map(emi => <li key={emi.name}><span>{emi.name}</span> <span>{formatCurrency(emi.amount)}</span></li>)}
                    </ul>
                </div>

                <div className="summary-card savings-card">
                    <h3>Savings Snapshot</h3>
                    <h2>{formatCurrency(savingsAmount)}</h2>
                    <p>Savings Rate: <span className='savings-rate'>{savingsRate}%</span></p>
                </div>

                <FinancialHealthTips income={income} expenses={expenses} savingsRate={savingsRate} expenseCategories={expenseCategories} />
            </div>
        </div>
    );
}
