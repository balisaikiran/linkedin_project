const User = require('../models/User');

const updateUserStats = async (userId, rewards) => {
  try {
    const totalPoints = rewards.points + rewards.bonusPoints;
    const update = {
      $inc: {
        score: totalPoints,
        prizesWon: rewards.prize ? 1 : 0
      },
      lastUpdated: Date.now()
    };

    const user = await User.findOneAndUpdate(
      { userId },
      update,
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
};

module.exports = updateUserStats; 