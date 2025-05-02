// Mapbox configuration
// We'll be using the API through our backend proxy for security
const MAPBOX_CONFIG = {
  // Optional public token for initialization - most API calls will go through the backend
  publicToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  
  // Default map style - you can change this to any Mapbox style
  defaultStyle: 'mapbox://styles/mapbox/streets-v12',
  
  // Default map settings
  defaultCenter: [-74.5, 40], // New York City area
  defaultZoom: 9,
  
  // API endpoints - these will be proxied through our backend
  api: {
    baseUrl: '/api/mapbox',
    geocode: '/geocode',
    reverseGeocode: '/reverse-geocode',
    directions: '/directions',
    isochrone: '/isochrone',
  },
};

export default MAPBOX_CONFIG; 