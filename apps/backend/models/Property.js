const mongoose = require('mongoose');

// Define the property schema
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a property title'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a property price']
  },
  propertyType: {
    type: String,
    required: [true, 'Please provide a property type'],
    enum: ['Home', 'Apartment', 'Office', 'Warehouse', 'Parking', 'Commercial']
  },
  status: {
    type: String,
    required: [true, 'Please provide a property status'],
    enum: ['For Sale', 'For Rent', 'Sold', 'Pending']
  },
  address: {
    full: {
      type: String,
      required: [true, 'Please provide a full address']
    },
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2;
        },
        message: 'Coordinates must be in the format [longitude, latitude]'
      }
    }
  },
  details: {
    beds: Number,
    baths: Number,
    sqft: Number,
    yearBuilt: Number
  },
  features: [String],
  images: [String],
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a geospatial index on the location field
propertySchema.index({ location: '2dsphere' });

// Define the Property model
const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 