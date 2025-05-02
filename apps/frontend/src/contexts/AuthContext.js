import { createContext, useState, useContext, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider, 
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authInitialized, setAuthInitialized] = useState(true);

  // Sign up function
  const signup = async (email, password, displayName) => {
    try {
      setError('');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      return result;
    } catch (err) {
      setError(err.message);
      console.warn('Signup error:', err.message);
      
      // In development, provide more user-friendly error messages
      if (process.env.NODE_ENV === 'development' && err.code === 'auth/invalid-api-key') {
        throw new Error('Firebase not configured - set up your .env.local file with Firebase credentials');
      }
      
      throw err;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setError('');
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      console.warn('Login error:', err.message);
      
      // In development, provide more user-friendly error messages
      if (process.env.NODE_ENV === 'development' && err.code === 'auth/invalid-api-key') {
        throw new Error('Firebase not configured - set up your .env.local file with Firebase credentials');
      }
      
      throw err;
    }
  };

  // Google sign-in
  const signInWithGoogle = async () => {
    try {
      setError('');
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
      console.warn('Google sign-in error:', err.message);
      
      // In development, provide more user-friendly error messages
      if (process.env.NODE_ENV === 'development' && err.code === 'auth/invalid-api-key') {
        throw new Error('Firebase not configured - set up your .env.local file with Firebase credentials');
      }
      
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    try {
      return signOut(auth);
    } catch (err) {
      console.warn('Logout error:', err.message);
      // In development mode, just pretend logout was successful
      if (process.env.NODE_ENV === 'development') {
        setCurrentUser(null);
        return Promise.resolve();
      }
      throw err;
    }
  };

  // Password reset function
  const resetPassword = async (email) => {
    try {
      setError('');
      return await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      console.warn('Reset password error:', err.message);
      
      // In development, provide more user-friendly error messages
      if (process.env.NODE_ENV === 'development' && err.code === 'auth/invalid-api-key') {
        throw new Error('Firebase not configured - set up your .env.local file with Firebase credentials');
      }
      
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (profile) => {
    try {
      setError('');
      // Check if auth is initialized and user exists
      if (!auth.currentUser) {
        throw new Error('User not logged in');
      }
      return await updateProfile(auth.currentUser, profile);
    } catch (err) {
      setError(err.message);
      console.warn('Update profile error:', err.message);
      throw err;
    }
  };

  // Effect to listen for auth state changes
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.warn('Auth state change error:', err.message);
      
      // Handle auth initialization error in development
      if (process.env.NODE_ENV === 'development') {
        setAuthInitialized(false);
        setLoading(false);
      }
      
      return () => {};
    }
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    authInitialized,
    signup,
    login,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 