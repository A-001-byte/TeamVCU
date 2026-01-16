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
            location: 'Mumbai, IN',
            expertise: 'Tax Filing, Audit',
            rating: 4.8,
            reviews: 120,
            image: '/images/ca1.jpg',
          },
          {
            id: 2,
            name: 'CA. Priya Gupta',
            location: 'Delhi, IN',
            expertise: 'GST, Corporate Law',
            rating: 4.9,
            reviews: 95,
            image: '/images/ca2.jpg',
          },
          {
            id: 3,
            name: 'CA. Rahul Verma',
            location: 'Bangalore, IN',
            expertise: 'Startup Advisory, Funding',
            rating: 4.7,
            reviews: 150,
            image: '/images/ca3.jpg',
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
