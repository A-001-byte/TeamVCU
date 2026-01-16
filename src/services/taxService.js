// src/services/taxService.js

// Mock API data. In a real application, this would come from a backend.
const MOCK_TAX_DATA = {
  suggestions: [
    {
      title: 'Maximize Section 80C Investments',
      description: 'Invest up to ₹1,50,000 in options like ELSS, PPF, NSC, 5-year FDs, and Sukanya Samriddhi Yojana to reduce taxable income.',
      category: 'Investment'
    },
    {
      title: 'Claim Health Insurance Premiums (Sec 80D)',
      description: 'Claim up to ₹25,000 for self/family and an additional ₹50,000 for senior citizen parents. This is over and above the 80C limit.',
      category: 'Health'
    },
    {
      title: 'Utilize National Pension System (NPS)',
      description: 'Get an additional tax deduction of up to ₹50,000 under Section 80CCD(1B), separate from the ₹1.5 lakh 80C limit.',
      category: 'Retirement'
    },
    {
        title: 'Claim Home Loan Benefits',
        description: 'Deduct up to ₹2,00,000 on home loan interest (Sec 24b) and principal repayment up to ₹1,50,000 (Sec 80C).',
        category: 'Loan'
    },
    {
        title: 'Standard Deduction for Salaried Individuals',
        description: 'A flat deduction of ₹50,000 is available to all salaried employees, which is typically pre-filled by your employer.',
        category: 'Salary'
    }
  ],
  deadlines: [
    {
      title: 'ITR Filing for FY 2023-24 (non-audit)',
      date: '2024-07-31',
    },
    {
      title: 'Advance Tax (2nd Installment)',
      date: '2024-09-15',
    },
    {
      title: 'Advance Tax (3rd Installment)',
      date: '2024-12-15',
    },
    {
      title: 'Belated/Revised ITR Filing for FY 2023-24',
      date: '2024-12-31',
    },
    {
      title: 'Investment Proof Submission (to employer)',
      date: '2025-01-31',
    },
    {
      title: 'Advance Tax (4th Installment)',
      date: '2025-03-15',
    }
  ]
};

// Simulate an API call with a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getTaxComplianceData = async () => {
  // In a real app, you would use the API client from `src/utils/api.js` here.
  // For example:
  // return await apiClient.get(ENDPOINTS.TAX_COMPLIANCE);
  
  await delay(500); // Simulate network latency
  console.log("Fetched mock tax data");
  return MOCK_TAX_DATA;
};
