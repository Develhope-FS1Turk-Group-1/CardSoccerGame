import { useEffect, useState } from 'react';

const PlayerCards = ({ selectedPlayer, setSelectedPlayer, id }) => {
	const [selectedCard, setSelectedCard] = useState(null);

	const handleClick = (cardId) => {
		if (id === cardId) {
			setSelectedCard(selectedPlayer);
			setSelectedPlayer(null)
		}
	};

	return (
		<div
			className='player'
			onClick={() => handleClick(id)}>
			{selectedCard}
		</div>
	);
};

export default PlayerCards;
