/**
 * Base API service for making requests to the backend
 */

import { auth } from '../config/firebase';

// Handle both old and new API URL formats
const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
const API_BASE_URL = configuredApiUrl.includes('/api') 
  ? configuredApiUrl 
  : `${configuredApiUrl}/api`;

/**
 * Constructs headers including auth token if user is logged in
 */
async function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth token if user is logged in
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }

  return headers;
}

/**
 * Makes a fetch request to the API
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const headers = await getHeaders();
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers,
      ...options,
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Handle API error responses
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while fetching data');
      }
      
      return data;
    }

    // Handle non-JSON responses
    if (!response.ok) {
      throw new Error('An error occurred while fetching data');
    }
    
    return await response.text();
    
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Export HTTP method helpers
export const api = {
  get: (endpoint, params = {}) => {
    const queryString = Object.keys(params).length 
      ? `?${new URLSearchParams(params).toString()}` 
      : '';
    
    return fetchAPI(`${endpoint}${queryString}`);
  },
  
  post: (endpoint, data) => {
    return fetchAPI(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  put: (endpoint, data) => {
    return fetchAPI(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: (endpoint) => {
    return fetchAPI(endpoint, {
      method: 'DELETE',
    });
  },
};

export default api; 