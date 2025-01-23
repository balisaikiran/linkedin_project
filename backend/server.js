const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const calculateRewards = require('./jobs/calculateRewards');
const updateUserStats = require('./jobs/updateUserStats');
const getUserStats = require('./jobs/getUserStats');

const app = express();
app.use(cors());
app.use(express.json());

// Here are the project parameters
mongoose.connect('mongodb://localhost:27017/clicker-game', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/api/click', async (req, res) => {
  try {
    const { userId } = req.body;
    const rewards = calculateRewards();
    const updatedStats = await updateUserStats(userId, rewards);
    res.json({ rewards, stats: updatedStats });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/stats/:userId', async (req, res) => {
  try {
    const stats = await getUserStats(req.params.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
}); 