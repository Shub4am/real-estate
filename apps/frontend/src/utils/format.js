/**
 * Utility functions for formatting data
 */

/**
 * Format a number as currency (USD)
 * @param {number} value - The value to format
 * @param {boolean} includeCents - Whether to include cents
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, includeCents = false) => {
  if (value === undefined || value === null) return '';
  
  // Handle string values that might already be formatted (e.g. "$ 1,625,000")
  if (typeof value === 'string') {
    if (value.trim().startsWith('$')) {
      return value; // Already formatted
    }
    // Try to parse the string as a number
    value = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: includeCents ? 2 : 0,
  });
  
  return formatter.format(value);
};

/**
 * Format a number with commas
 * @param {number} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (value === undefined || value === null) return '';
  
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format a date string to a human-readable format
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateObj);
}; 