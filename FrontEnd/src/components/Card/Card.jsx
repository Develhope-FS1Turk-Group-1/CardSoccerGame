import React from 'react';
import './CardStyle.css'; // Your CSS file for styling
import { useEffect, useState } from 'react';


const Card = ({
  selectedPlayer,
  setSelectedPlayer,
  id,
  addPlayerToIndex,
  playersOnBoard,
}) => {

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (playersOnBoard[id - 1] != null) {
      setSelectedCard(playersOnBoard[id - 1]);
    }
  }, [playersOnBoard]);

  // const handleClick = (cardId) => {
  //   console.log(selectedPlayer)
  //   if (id === cardId) {
  //     setSelectedCard(selectedPlayer.name);
  //     addPlayerToIndex(id - 1, selectedPlayer);
  //   }
  //   setSelectedPlayer(null);
  // };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const dataArray = data.split(',');
    console.log(dataArray, "bıraktım gitti");
    addPlayerToIndex(event.target.id - 1, { onlineplayerid: dataArray[1], name: dataArray[0] })

    event.target.innerHTML = dataArray[0];

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="player-card"
      id={id}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      >

        <div className="player-details">
          <div class="player-name">
            <h2>{selectedCard?.name}</h2>
          </div>

          <div className="player-image">
            <img src={selectedCard?.img} alt="Football Player" />
            <span class="number">{selectedCard?.power}</span>
          </div>
        </div>
        <div className="positions">
          <div className="left">
            <p> {selectedCard?.att} DEF </p>
            <p> {selectedCard?.def} ATT </p>
          </div>
          <div className="right">
            <p> {selectedCard?.mid} MID </p>
            <p> {selectedCard?.gk} GK </p>
          </div>
        </div>
      </div>
  );
};

export default Card;
