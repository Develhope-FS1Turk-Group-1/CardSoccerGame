import React from 'react';
import './CardStyle.css'; // Your CSS file for styling

const Card = () => {
  const playerInfo = {
    playerName: 'Test Player',
    playerImage: './images/bellingham.jpeg',
    playerInfo: {
      GK: 20,
      DF: 80,
      MF: 86,
      FW: 60,
    }
  };

  const { playerName, playerImage, playerInfo: positions } = playerInfo;

  return (
    <div className="player-card">
      <div className="player-info">
        <div className="player-details">
            <div class="player-name">
                <h2>{playerName}</h2>
            </div>
          
          <div className="player-image">
            <img src={playerImage} alt="Football Player" />
            <span class="number">10</span>
          </div>
        </div>
        <div className="positions">
        <div className="left">
            {Object.keys(positions).slice(0, 2).map((position) => (
            <p key={position}>
                <strong>{position}:</strong> {positions[position]}
            </p>
            ))}
        </div>
        <div className="right">
            {Object.keys(positions).slice(2).map((position) => (
            <p key={position}>
                <strong>{position}:</strong> {positions[position]}
            </p>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
