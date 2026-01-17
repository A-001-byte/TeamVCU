import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { apiClient } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function CsvUploadButton({ onUploadSuccess }) {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['.csv', '.xlsx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      setStatus('error');
      setErrorMessage('Please upload a CSV or Excel file');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Only add user_id if user exists
    if (user?.id) {
      formData.append('user_id', user.id);
    }

    try {
      // Call the Flask endpoint
      let response;
      if (fileExtension === '.xlsx') {
        response = await apiClient.upload('/transactions/upload-excel', formData);
      } else {
        response = await apiClient.upload('/transactions/upload', formData);
      }
      
      console.log('Upload successful:', response);
      
      setStatus('success');
      
      // Small delay to ensure DB is updated, then call callback
      setTimeout(() => {
        console.log('Calling refetch after upload...');
        if (onUploadSuccess) {
          onUploadSuccess(response);
        }
      }, 1000);
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        // Reset file input
        e.target.value = '';
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Upload failed');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="relative">
      <input 
        type="file" 
        accept=".csv,.xlsx" 
        onChange={handleUpload} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        disabled={status === 'loading'}
      />
      <button 
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          status === 'success' ? 'bg-green-100 text-green-700' : 
          status === 'error' ? 'bg-red-100 text-red-700' : 
          status === 'loading' ? 'bg-gray-400 text-white cursor-not-allowed' :
          'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 
         status === 'success' ? <CheckCircle size={18} /> : 
         status === 'error' ? <XCircle size={18} /> : <Upload size={18} />}
        <span>
          {status === 'loading' ? 'Processing...' : 
           status === 'success' ? 'Uploaded!' : 
           status === 'error' ? 'Failed!' :
           'Upload Statement'}
        </span>
      </button>
      
      {/* Error message display */}
      {errorMessage && status === 'error' && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
