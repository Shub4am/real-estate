// Test MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

// Using the correct username and password
const uri = 'mongodb+srv://mazradwan:$1TrillionDollars@cluster0.wuthldj.mongodb.net/?retryWrites=true&w=majority';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected successfully to MongoDB!');
    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Connection error:', error.message);
  }
}

testConnection(); 