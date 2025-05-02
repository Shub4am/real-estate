require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Property = require('../models/Property');

// Mock property data based on the properties in tabs.jsx
const propertyData = [
  // Home properties
  {
    title: "Modern Glass House",
    price: 1625000,
    propertyType: "Home",
    status: "For Sale",
    address: {
      full: "14 Patrick Brem Court, Mahwah, New Jersey 07430, United States",
      street: "14 Patrick Brem Court",
      city: "Mahwah",
      state: "New Jersey",
      zip: "07430",
      country: "United States"
    },
    location: {
      type: "Point",
      coordinates: [-74.18429, 41.06623] // [longitude, latitude]
    },
    details: {
      beds: 3,
      baths: 2,
      sqft: 3450,
      yearBuilt: 1995
    },
    features: ["Large Windows", "Modern Kitchen", "Swimming Pool", "Garden"],
    images: ["https://example.com/images/house1.jpg"], // Replace with actual image URLs later
    description: "Stunning modern glass house with panoramic views."
  },
  {
    title: "Contemporary Villa",
    price: 1625000,
    propertyType: "Home",
    status: "For Sale",
    address: {
      full: "28 Lakeside Drive, Mahwah, New Jersey 07430, United States",
      street: "28 Lakeside Drive",
      city: "Mahwah",
      state: "New Jersey",
      zip: "07430",
      country: "United States"
    },
    location: {
      type: "Point",
      coordinates: [-74.19529, 41.05623] // Slightly different location
    },
    details: {
      beds: 4,
      baths: 3,
      sqft: 3250,
      yearBuilt: 2005
    },
    features: ["Lakefront", "Fireplace", "Home Office", "Smart Home"],
    images: ["https://example.com/images/house2.jpg"],
    description: "Beautiful contemporary villa with lakefront views and modern amenities."
  },
  
  // Apartment properties
  {
    title: "Luxury Penthouse",
    price: 2500000,
    propertyType: "Apartment",
    status: "For Sale",
    address: {
      full: "200 Central Park South, New York, NY 10019, United States",
      street: "200 Central Park South",
      city: "New York",
      state: "New York",
      zip: "10019",
      country: "United States"
    },
    location: {
      type: "Point",
      coordinates: [-73.98229, 40.76623]
    },
    details: {
      beds: 3,
      baths: 3,
      sqft: 2850,
      yearBuilt: 2010
    },
    features: ["Central Park Views", "Doorman", "Fitness Center", "Private Terrace"],
    images: ["https://example.com/images/apartment1.jpg"],
    description: "Stunning penthouse with breathtaking views of Central Park."
  },
  {
    title: "Modern Loft",
    price: 2500000,
    propertyType: "Apartment",
    status: "For Sale",
    address: {
      full: "145 Hudson Street, New York, NY 10013, United States",
      street: "145 Hudson Street",
      city: "New York",
      state: "New York",
      zip: "10013",
      country: "United States"
    },
    location: {
      type: "Point",
      coordinates: [-74.00729, 40.71923]
    },
    details: {
      beds: 2,
      baths: 2,
      sqft: 2200,
      yearBuilt: 2008
    },
    features: ["High Ceilings", "Exposed Brick", "Stainless Steel Appliances", "Floor-to-Ceiling Windows"],
    images: ["https://example.com/images/apartment2.jpg"],
    description: "Spacious loft with high ceilings and industrial charm in Tribeca."
  },
  
  // Office properties
  {
    title: "Modern Office Space",
    price: 1800000,
    propertyType: "Office",
    status: "For Sale",
    address: {
      full: "555 Madison Avenue, New York, NY 10022, United States",
      street: "555 Madison Avenue",
      city: "New York",
      state: "New York",
      zip: "10022",
      country: "United States"
    },
    location: {
      type: "Point",
      coordinates: [-73.97329, 40.76123]
    },
    details: {
      beds: 0,
      baths: 2,
      sqft: 5000,
      yearBuilt: 2015
    },
    features: ["Conference Rooms", "Reception Area", "Kitchen", "IT Infrastructure"],
    images: ["https://example.com/images/office1.jpg"],
    description: "Prime office space in Midtown Manhattan with modern amenities."
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Delete existing properties
    await Property.deleteMany({});
    console.log('Existing properties deleted');
    
    // Insert new properties
    await Property.insertMany(propertyData);
    console.log(`${propertyData.length} properties inserted successfully`);
    
    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 