require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Routes
const mapboxRoutes = require('./routes/mapbox');
const authRoutes = require('./routes/auth');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5001;
const isDevelopment = process.env.NODE_ENV === 'development';

// Middleware
app.use(cors());
app.use(express.json());

// Firebase Admin initialization (disabled until serviceAccount is set up)
let firebaseAdmin;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT
    );
    firebaseAdmin = initializeApp({
      credential: cert(serviceAccount)
    });
    console.log('Firebase Admin initialized successfully');
  } else {
    console.log('Firebase Service Account not found, auth verification disabled');
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

// Auth middleware
const authMiddleware = async (req, res, next) => {
  // Skip auth in development mode
  if (isDevelopment) {
    console.warn('Auth check skipped in development mode');
    return next();
  }

  if (!firebaseAdmin) {
    return res.status(401).json({ error: 'Firebase Admin not initialized' });
  }

  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

// Routes
// In development, don't require authentication for Mapbox routes
if (isDevelopment) {
  app.use('/api/mapbox', mapboxRoutes);
  console.log('Mapbox routes accessible without authentication in development mode');
} else {
  app.use('/api/mapbox', authMiddleware, mapboxRoutes);
}

app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date(), mode: isDevelopment ? 'development' : 'production' });
});

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT} in ${isDevelopment ? 'development' : 'production'} mode`);
}); 