/**
 * Property service for handling property-related API calls
 */
import api from './api';

const propertyService = {
  /**
   * Get all properties with pagination and filtering
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Number of properties per page
   * @param {string} params.propertyType - Filter by property type
   * @param {number} params.minPrice - Filter by minimum price
   * @param {number} params.maxPrice - Filter by maximum price
   * @returns {Promise<Object>} Properties with pagination info
   */
  getProperties: (params = {}) => {
    return api.get('/properties', params);
  },

  /**
   * Get a property by ID
   * @param {string} id - Property ID
   * @returns {Promise<Object>} Property data
   */
  getPropertyById: (id) => {
    return api.get(`/properties/${id}`);
  },

  /**
   * Get properties near a location
   * @param {Object} location - Location coordinates
   * @param {number} location.lat - Latitude
   * @param {number} location.lng - Longitude
   * @param {number} maxDistance - Max distance in meters (default: 10000m/10km)
   * @returns {Promise<Array>} Nearby properties
   */
  getNearbyProperties: (location, maxDistance = 10000) => {
    return api.get('/properties/nearby', {
      lat: location.lat,
      lng: location.lng,
      maxDistance,
    });
  },

  /**
   * Geocode an address using Mapbox
   * @param {string} address - Address to geocode
   * @returns {Promise<Object>} Geocoding results
   */
  geocodeAddress: (address) => {
    return api.get('/mapbox/geocode', { address });
  },
  
  /**
   * Get properties by type
   * @param {string} propertyType - Property type (Home, Apartment, etc.)
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Object>} Properties with pagination info
   */
  getPropertiesByType: (propertyType, params = {}) => {
    return api.get('/properties', {
      ...params,
      propertyType,
    });
  },
};

export default propertyService; 