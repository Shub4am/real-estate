// Import Firebase dependencies
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Your Firebase configuration
// Replace with your own Firebase config from the Firebase console
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-0000000000',
};

// Dummy Firebase functionality for development when no API keys are set
const dummyAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(null);
    return () => {}; // return unsubscribe function
  },
  signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase auth not configured in development')),
  createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase auth not configured in development')),
  signOut: () => Promise.resolve(),
  signInWithPopup: () => Promise.reject(new Error('Firebase auth not configured in development')),
};

const dummyFirestore = {
  collection: () => ({
    add: () => Promise.resolve({ id: 'dummy-id' }),
    doc: () => ({
      get: () => Promise.resolve({ exists: false, data: () => ({}) }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
  }),
};

const dummyStorage = {
  ref: () => ({
    put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('https://placeholder.com/image.jpg') } }),
  }),
};

let auth, db, storage, app;

try {
  // Initialize Firebase if it hasn't been initialized already
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

  // Get authentication instance
  auth = getAuth(app);

  // Get Firestore instance
  db = getFirestore(app);

  // Get Storage instance
  storage = getStorage(app);

  // Connect to emulators in development
  if (isDevelopment && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true') {
    // Auth emulator
    connectAuthEmulator(auth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL || 'http://localhost:9099');
    
    // Firestore emulator
    connectFirestoreEmulator(
      db, 
      process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST || 'localhost', 
      parseInt(process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_PORT || '8080')
    );
    
    // Storage emulator
    connectStorageEmulator(
      storage, 
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST || 'localhost', 
      parseInt(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT || '9199')
    );
    
    console.log('Using Firebase emulators');
  }

  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization error:', error.message);
  if (isDevelopment) {
    console.warn('Using dummy Firebase in development mode');
    auth = dummyAuth;
    db = dummyFirestore;
    storage = dummyStorage;
  } else {
    throw error; // rethrow in production
  }
}

export { app, auth, db, storage }; 