import { useEffect, useState } from 'react';

const PlayerCards = ({
	selectedPlayer,
	setSelectedPlayer,
	id,
	addPlayerToIndex,
	playersOnBoard,
}) => {
	const [selectedCard, setSelectedCard] = useState(null);

	useEffect(()=>{
		if(playersOnBoard[id-1] != null){
			setSelectedCard(playersOnBoard[id-1]);
		}
	},[playersOnBoard]);

	const handleClick = (cardId) => {
		if (id === cardId) {
			setSelectedCard(selectedPlayer);
			addPlayerToIndex(id-1,selectedPlayer);
		}
		setSelectedPlayer(null);
	};


	return (
		<div
			className='player'
			onClick={() => handleClick(id)}
			>
			{selectedCard}
		</div>
	);
};

export default PlayerCards;
