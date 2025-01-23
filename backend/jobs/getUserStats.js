const User = require('../models/User');

const getUserStats = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    return user || { userId, score: 0, prizesWon: 0 };
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
};

module.exports = getUserStats; 