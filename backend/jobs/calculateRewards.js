const calculateRewards = () => {
  const rewards = {
    points: 1,
    bonusPoints: 0,
    prize: false
  };

  // 50% chance for bonus points
  if (Math.random() < 0.5) {
    rewards.bonusPoints = 10;
  }

  // 25% chance for prize
  if (Math.random() < 0.25) {
    rewards.prize = true;
  }

  return rewards;
};

module.exports = calculateRewards; 