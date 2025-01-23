import React, { useState, useEffect } from 'react';
import '../styles/ClickerGame.css';

const ClickerGame = () => {
  const [stats, setStats] = useState({ score: 0, prizesWon: 0 });
  const [message, setMessage] = useState('');
  const userId = 'user123'; // In a real app, this would come from authentication

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/stats/${userId}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await response.json();
      setStats(data.stats);

      let newMessage = '';
      if (data.rewards.bonusPoints) {
        newMessage += '🎉 Bonus +10 points! ';
      }
      if (data.rewards.prize) {
        newMessage += '🎁 You won a prize!';
      }
      setMessage(newMessage);
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error clicking:', error);
    }
  };

  return (
    <div className="clicker-container">
      <h1>Clicker Game</h1>
      <div className="stats">
        <p>Score: {stats.score}</p>
        <p>Prizes Won: {stats.prizesWon}</p>
      </div>
      <button className="clicker-button" onClick={handleClick}>
        Click Me!
      </button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default ClickerGame; 