const checkOwnership = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);

    // Check if the authenticated user is trying to modify their own data
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to modify this data' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking ownership', error: error.message });
  }
};

module.exports = checkOwnership; 