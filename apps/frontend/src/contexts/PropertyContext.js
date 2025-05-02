import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import propertyService from '../services/propertyService';

// Create Property Context
const PropertyContext = createContext();

// Property types mapping (matches the tabs in the UI)
export const PROPERTY_TYPES = {
  HOME: 'Home',
  APARTMENT: 'Apartment',
  OFFICE: 'Office',
  WAREHOUSE: 'Warehouse',
  PARKING: 'Parking',
  COMMERCIAL: 'Commercial',
};

export function PropertyProvider({ children }) {
  // State for database properties (will be used later)
  const [dbProperties, setDbProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentType, setCurrentType] = useState(PROPERTY_TYPES.HOME);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1, 
    totalPages: 1,
    totalProperties: 0
  });
  
  // Fetch properties by type from MongoDB
  const fetchPropertiesByType = useCallback(async (type = currentType, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.getPropertiesByType(type, { page, limit: 9 });
      
      setDbProperties(result.properties || []);
      setFilteredProperties(result.properties || []);
      setPagination({
        currentPage: result.currentPage || 1,
        totalPages: result.totalPages || 1,
        totalProperties: result.totalProperties || 0
      });
      setCurrentType(type);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
      
      // Fallback to empty data
      setDbProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  }, [currentType]);
  
  // Filter properties by price range
  const filterByPrice = useCallback((minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) {
      setFilteredProperties(dbProperties);
      return;
    }
    
    const filtered = dbProperties.filter(property => {
      if (minPrice && maxPrice) {
        return property.price >= minPrice && property.price <= maxPrice;
      }
      if (minPrice) {
        return property.price >= minPrice;
      }
      if (maxPrice) {
        return property.price <= maxPrice;
      }
      return true;
    });
    
    setFilteredProperties(filtered);
  }, [dbProperties]);
  
  // Get a property by ID
  const getPropertyById = useCallback(async (id) => {
    setLoading(true);
    
    try {
      const property = await propertyService.getPropertyById(id);
      setSelectedProperty(property);
      return property;
    } catch (err) {
      setError('Failed to load property details.');
      console.error('Error fetching property:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Search for properties near a location
  const searchNearbyProperties = useCallback(async (location, distance) => {
    setLoading(true);
    
    try {
      const nearby = await propertyService.getNearbyProperties(location, distance);
      return nearby;
    } catch (err) {
      setError('Failed to find nearby properties.');
      console.error('Error searching nearby properties:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Context value - only exposing what's needed for now
  const value = {
    // The actual data will be handled by the existing components for now
    dbProperties,        // MongoDB properties (not used in UI yet)
    filteredProperties,  // Filtered MongoDB properties (not used in UI yet)
    loading,
    error,
    pagination,
    currentType,
    selectedProperty,
    fetchPropertiesByType,
    filterByPrice,
    getPropertyById,
    searchNearbyProperties,
    setSelectedProperty
  };
  
  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

// Custom hook to use the Property context
export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}

export default PropertyContext; 