const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// @route   GET /api/properties
// @desc    Get all properties
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Basic filtering and pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Filter by property type if provided
    const filter = {};
    if (req.query.propertyType) {
      filter.propertyType = req.query.propertyType;
    }
    
    // Filter by price range if provided
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseInt(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseInt(req.query.maxPrice);
    }
    
    const properties = await Property.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Property.countDocuments(filter);
    
    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalProperties: total
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/properties/:id
// @desc    Get property by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/properties
// @desc    Create new property
// @access  Private (will need auth middleware)
router.post('/', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const property = await newProperty.save();
    res.status(201).json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private (will need auth middleware)
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private (will need auth middleware)
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/properties/nearby
// @desc    Find properties near a location
// @access  Public
router.get('/nearby', async (req, res) => {
  try {
    const { lng, lat, maxDistance = 10000 } = req.query; // maxDistance in meters, default 10km
    
    if (!lng || !lat) {
      return res.status(400).json({ error: 'Longitude and latitude are required' });
    }
    
    const properties = await Property.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).limit(10);
    
    res.json(properties);
  } catch (error) {
    console.error('Error finding nearby properties:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 