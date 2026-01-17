/**
 * API utility functions
 */

import { API_CONFIG } from '../constants';

/**
 * Create a fetch request with timeout
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise<any>} Parsed response data
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = {
        message: `HTTP error! status: ${response.status}`,
        error: response.statusText || 'Unknown error'
      };
    }
    throw new Error(error.message || error.error || 'An error occurred');
  }
  return response.json();
};

/**
 * API client class
 */
class ApiClient {
  constructor(baseURL = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Get auth headers with token
   * Token is synced from Supabase session to localStorage by authService
   * @returns {object} Headers object
   */
  getAuthHeaders() {
    const token = localStorage.getItem('thinktwice_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Get request
   * @param {string} endpoint - API endpoint
   * @param {RequestInit} options - Fetch options
   * @returns {Promise<any>} Response data
   */
  async get(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'GET',
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });
    return handleResponse(response);
  }

  /**
   * Post request
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request body
   * @param {RequestInit} options - Fetch options
   * @returns {Promise<any>} Response data
   */
  async post(endpoint, data, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });
    return handleResponse(response);
  }

  /**
   * Upload request for file uploads
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - FormData object containing files
   * @returns {Promise<any>} Response data
   */
  async upload(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      // Note: No 'Content-Type' header set - browser automatically sets it for FormData with boundary
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          ...this.getAuthHeaders(),
        },
      });
      clearTimeout(timeoutId);
      return handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Put request
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request body
   * @param {RequestInit} options - Fetch options
   * @returns {Promise<any>} Response data
   */
  async put(endpoint, data, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });
    return handleResponse(response);
  }

  /**
   * Delete request
   * @param {string} endpoint - API endpoint
   * @param {RequestInit} options - Fetch options
   * @returns {Promise<any>} Response data
   */
  async delete(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetchWithTimeout(url, {
      ...options,
      method: 'DELETE',
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });
    return handleResponse(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for custom instances
export default ApiClient;
