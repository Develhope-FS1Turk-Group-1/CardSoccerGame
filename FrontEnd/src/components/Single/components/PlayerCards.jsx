import { useEffect, useState } from 'react';

const PlayerCards = ({
	selectedPlayer,
	setSelectedPlayer,
	id,
	addPlayerToIndex,
	playersOnBoard,
}) => {
	const [selectedCard, setSelectedCard] = useState(null);

	useEffect(() => {
		if (playersOnBoard[id - 1] != null) {
			setSelectedCard(playersOnBoard[id - 1].name);
		}
	}, [playersOnBoard]);

	const handleClick = (cardId) => {
		if (id === cardId) {
			setSelectedCard(selectedPlayer.name);
			addPlayerToIndex(id - 1, selectedPlayer);
		}
		setSelectedPlayer(null);
	};


	const handleDrop = (event) => {
		event.preventDefault();
		const data = event.dataTransfer.getData('text/plain');
		event.target.innerHTML = data;
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className='player'
			onClick={() => handleClick(id)}>
			{selectedCard}
		</div>
	);
};

export default PlayerCards;
