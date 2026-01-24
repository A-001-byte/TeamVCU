import { useState, useEffect } from 'react';
import { API_CONFIG } from '../constants';

export const useTaxComplianceData = () => {
  const [data, setData] = useState({ 
    taxSavingSuggestions: [], 
    deadlines: [],
    cibilScore: {
      score: 720,
      rating: 'Good',
      status: 'Good',
      details: [
        'Payment History: On-time (35%)',
        'Credit Utilization: Low at 18% (30%)',
        'Credit Mix: Diverse (15%)',
        'Account Age: 5+ years (10%)',
        'Credit Inquiries: 1 in last 6 months (10%)'
      ]
    },
    taxComplianceStatus: {
      filedReturns: 5,
      pendingDeadlines: 2,
      documentsUploaded: true
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you would fetch from an API endpoint.
        // For this example, we'll simulate an API call with a delay.
        const response = await new Promise(resolve => setTimeout(() => resolve({
          cibilScore: {
            score: 720,
            rating: 'Good',
            status: 'Good',
            details: [
              'Payment History: On-time (35%)',
              'Credit Utilization: Low at 18% (30%)',
              'Credit Mix: Diverse (15%)',
              'Account Age: 5+ years (10%)',
              'Credit Inquiries: 1 in last 6 months (10%)'
            ]
          },
          taxComplianceStatus: {
            filedReturns: 5,
            pendingDeadlines: 2,
            documentsUploaded: true
          },
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
              title: 'Investment Proof Submission (to employer)',
              date: '2026-01-31',
              description: 'Submit proofs of 80C investments to your employer'
            },
            {
              title: 'Advance Tax (4th Installment)',
              date: '2026-03-15',
              description: 'Last advance tax installment for FY 2024-25'
            },
            {
              title: 'ITR Filing Deadline (Non-audit)',
              date: '2026-07-31',
              description: 'File ITR before July 31 to avoid penalties'
            },
            {
              title: 'ITR Filing Deadline (Audit)',
              date: '2026-10-31',
              description: 'Extended deadline for businesses requiring audit'
            },
            {
              title: 'Advance Tax (1st Installment) - FY 2025-26',
              date: '2026-06-15',
              description: 'First installment of advance tax for next financial year'
            },
            {
              title: 'Advance Tax (2nd Installment) - FY 2025-26',
              date: '2026-09-15',
              description: 'Second installment of advance tax for next financial year'
            },
            {
              title: 'Belated ITR Filing Deadline',
              date: '2026-12-31',
              description: 'Last date to file belated or revised ITR with penalty'
            },
            {
              title: 'Form 26AS Review',
              date: '2026-02-28',
              description: 'Review your Form 26AS for TDS and tax credits'
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
