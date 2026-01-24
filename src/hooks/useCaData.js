import { useState, useEffect } from 'react';


export const useCaData = () => {
  const [cas, setCas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCas = async () => {
      try {
        // Simulate API call
        const response = await new Promise(resolve => setTimeout(() => resolve([
          {
            id: 1,
            name: 'CA. Ankit Sharma',
            location: 'Mumbai',
            expertise: ['Tax Filing', 'ITR', 'GST Compliance'],
            rating: 4.8,
            reviews: 240,
            experience: 12,
            hourlyRate: 1500,
            responseTime: '2 hours',
            languages: ['English', 'Hindi', 'Marathi'],
            consultation: ['Online', 'In-person'],
            badge: 'Verified Expert',
            availability: 'Available',
          },
          {
            id: 2,
            name: 'CA. Priya Gupta',
            location: 'Delhi NCR',
            expertise: ['Corporate Tax', 'GST Advisory', 'Transfer Pricing'],
            rating: 4.9,
            reviews: 189,
            experience: 15,
            hourlyRate: 2000,
            responseTime: '1 hour',
            languages: ['English', 'Hindi'],
            consultation: ['Online'],
            badge: 'Top Rated',
            availability: 'Available',
          },
          {
            id: 3,
            name: 'CA. Rahul Verma',
            location: 'Bangalore',
            expertise: ['Startup Tax', 'Equity Planning', 'Funding Advisory'],
            rating: 4.7,
            reviews: 156,
            experience: 10,
            hourlyRate: 1800,
            responseTime: '3 hours',
            languages: ['English', 'Hindi', 'Kannada'],
            consultation: ['Online', 'In-person'],
            badge: 'Startup Expert',
            availability: 'Available',
          },
          {
            id: 4,
            name: 'CA. Neha Desai',
            location: 'Ahmedabad',
            expertise: ['Personal Tax Planning', 'Investment Strategy', 'Wealth Management'],
            rating: 4.6,
            reviews: 128,
            experience: 8,
            hourlyRate: 1200,
            responseTime: '30 mins',
            languages: ['English', 'Hindi', 'Gujarati'],
            consultation: ['Online', 'In-person'],
            badge: 'Fast Responder',
            availability: 'Available',
          },
          {
            id: 5,
            name: 'CA. Vikram Singh',
            location: 'Pune',
            expertise: ['Business Setup', 'Audit & Assurance', 'Compliance'],
            rating: 4.9,
            reviews: 213,
            experience: 14,
            hourlyRate: 1700,
            responseTime: '1.5 hours',
            languages: ['English', 'Hindi', 'Marathi'],
            consultation: ['Online', 'In-person'],
            badge: 'Verified Expert',
            availability: 'Available',
          },
          {
            id: 6,
            name: 'CA. Sneha Patel',
            location: 'Ahmedabad',
            expertise: ['International Tax', 'Transfer Pricing', 'NRI Services'],
            rating: 4.8,
            reviews: 94,
            experience: 11,
            hourlyRate: 2500,
            responseTime: '2 hours',
            languages: ['English', 'Hindi', 'Gujarati'],
            consultation: ['Online'],
            badge: 'Specialist',
            availability: 'Available',
          },
          {
            id: 7,
            name: 'CA. Arjun Nair',
            location: 'Kochi',
            expertise: ['Import-Export', 'Customs Law', 'Trade Advisory'],
            rating: 4.7,
            reviews: 87,
            experience: 9,
            hourlyRate: 1400,
            responseTime: '2.5 hours',
            languages: ['English', 'Hindi', 'Malayalam'],
            consultation: ['Online', 'In-person'],
            badge: 'Trade Expert',
            availability: 'Available',
          },
          {
            id: 8,
            name: 'CA. Divya Kapoor',
            location: 'Noida',
            expertise: ['Real Estate Tax', 'NPA Advisory', 'Restructuring'],
            rating: 4.8,
            reviews: 167,
            experience: 13,
            hourlyRate: 1900,
            responseTime: '1 hour',
            languages: ['English', 'Hindi'],
            consultation: ['Online', 'In-person'],
            badge: 'Real Estate Specialist',
            availability: 'Available',
          },
          {
            id: 9,
            name: 'CA. Manish Tandon',
            location: 'Chennai',
            expertise: ['Manufacturing Tax', 'Supply Chain', 'Excise Law'],
            rating: 4.6,
            reviews: 112,
            experience: 10,
            hourlyRate: 1600,
            responseTime: '3 hours',
            languages: ['English', 'Hindi', 'Tamil'],
            consultation: ['Online'],
            badge: 'Industrial Expert',
            availability: 'Available',
          },
        ]), 1000));
        setCas(response);
      } catch (err) {
        setError('Failed to fetch CA data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCas();
  }, []);

  return { cas, loading, error };
};
