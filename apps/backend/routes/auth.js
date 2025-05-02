const express = require('express');
const { getAuth } = require('firebase-admin/auth');
const router = express.Router();

// Verify token and return user info
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    const userRecord = await getAuth().getUser(decodedToken.uid);
    
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      phoneNumber: userRecord.phoneNumber,
      disabled: userRecord.disabled,
      metadata: {
        creationTime: userRecord.metadata.creationTime,
        lastSignInTime: userRecord.metadata.lastSignInTime,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token', details: error.message });
  }
});

// Get user by ID (admin only)
router.get('/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    // This route should be protected by an admin middleware in production
    const userRecord = await getAuth().getUser(uid);
    
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      metadata: {
        creationTime: userRecord.metadata.creationTime,
        lastSignInTime: userRecord.metadata.lastSignInTime,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(404).json({ error: 'User not found', details: error.message });
  }
});

// Update user profile
router.post('/update-profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    const { displayName, photoURL, phoneNumber } = req.body;
    
    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    
    await getAuth().updateUser(decodedToken.uid, updateData);
    const updatedUser = await getAuth().getUser(decodedToken.uid);
    
    res.json({
      success: true,
      user: {
        uid: updatedUser.uid,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        photoURL: updatedUser.photoURL,
        phoneNumber: updatedUser.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(400).json({ error: 'Failed to update profile', details: error.message });
  }
});

// Get current user info
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    const userRecord = await getAuth().getUser(decodedToken.uid);
    
    res.json({
      uid: userRecord.uid,
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      phoneNumber: userRecord.phoneNumber,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(401).json({ error: 'Authentication failed', details: error.message });
  }
});

module.exports = router; 