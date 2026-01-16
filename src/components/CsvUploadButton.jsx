import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { apiClient } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function CsvUploadButton({ onUploadSuccess }) {
  const [status, setStatus] = useState('idle');
  const { user } = useAuth();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus('loading');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user.id); // <--- The Critical Link

    try {
      // Determine endpoint based on file type
      const endpoint = file.name.endsWith('.xlsx') ? '/transactions/upload-excel' : '/transactions/upload';
      
      // Use .upload() instead of .post() for FormData
      await apiClient.upload(endpoint, formData);
      
      setStatus('success');
      if (onUploadSuccess) onUploadSuccess(); // Refresh data
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      <input 
        type="file" 
        accept=".csv, .xlsx" 
        onChange={handleUpload} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
      />
      <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        status === 'success' ? 'bg-green-100 text-green-700' : 
        status === 'error' ? 'bg-red-100 text-red-700' : 
        'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 
         status === 'success' ? <CheckCircle size={18} /> : 
         status === 'error' ? <XCircle size={18} /> : <Upload size={18} />}
        <span>
          {status === 'loading' ? 'Processing...' : 
           status === 'success' ? 'Uploaded!' : 
           'Upload Statement'}
        </span>
      </button>
    </div>
  );
}
