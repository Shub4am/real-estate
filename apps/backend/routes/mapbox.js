const express = require('express');
const axios = require('axios');
const router = express.Router();

// Mapbox API base URL
const MAPBOX_API_URL = process.env.MAPBOX_API_URL || 'https://api.mapbox.com';

// Get Mapbox access token from environment variables
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

// Error handler for missing token
if (!MAPBOX_ACCESS_TOKEN) {
  console.warn('MAPBOX_ACCESS_TOKEN not found in environment variables');
}

// Geocoding endpoint - convert addresses to coordinates
router.get('/geocode', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = await axios.get(
      `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
      {
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
          limit: 5,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Mapbox geocoding error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching data from Mapbox',
      details: error.response?.data || error.message,
    });
  }
});

// Reverse geocoding - convert coordinates to addresses
router.get('/reverse-geocode', async (req, res) => {
  try {
    const { longitude, latitude } = req.query;
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude parameters are required' });
    }

    const response = await axios.get(
      `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
      {
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
          limit: 1,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Mapbox reverse geocoding error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching data from Mapbox',
      details: error.response?.data || error.message,
    });
  }
});

// Directions endpoint - get directions between points
router.get('/directions', async (req, res) => {
  try {
    const { coordinates, profile = 'driving' } = req.query;
    if (!coordinates) {
      return res.status(400).json({ error: 'Coordinates parameter is required' });
    }

    const response = await axios.get(
      `${MAPBOX_API_URL}/directions/v5/mapbox/${profile}/${coordinates}`,
      {
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
          geometries: 'geojson',
          steps: true,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Mapbox directions error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching directions from Mapbox',
      details: error.response?.data || error.message,
    });
  }
});

// Isochrone endpoint - get travel time polygons
router.get('/isochrone', async (req, res) => {
  try {
    const { longitude, latitude, contours_minutes } = req.query;
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude parameters are required' });
    }

    const response = await axios.get(
      `${MAPBOX_API_URL}/isochrone/v1/mapbox/driving/${longitude},${latitude}`,
      {
        params: {
          access_token: MAPBOX_ACCESS_TOKEN,
          contours_minutes: contours_minutes || '15,30,45',
          polygons: true,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Mapbox isochrone error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching isochrone data from Mapbox',
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router; 