import { useState, useEffect } from 'react';
import { API_CONFIG } from '../constants';

export const useTaxComplianceData = () => {
  const [data, setData] = useState({ taxSavingSuggestions: [], deadlines: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from an API endpoint.
        // For this example, we'll simulate an API call with a delay.
        const response = await new Promise(resolve => setTimeout(() => resolve({
          taxSavingSuggestions: [
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
        }), 1000));
        setData(response);
      } catch (err) {
        setError('Failed to fetch tax compliance data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
