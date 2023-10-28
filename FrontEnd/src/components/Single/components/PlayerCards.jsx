import { useEffect, useState } from 'react';

const PlayerCards = ({
	selectedPlayer,
	setSelectedPlayer,
	id,
	userFormation,
	setUserFormation,
	addPlayerToIndex,
	deletePlayerAtIndex,
	playersOnBoard
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
			onClick={() => handleClick(id)}>
			{/*userFormation.length > 0 &&
			id === userFormation[userFormation.length - 1].id
				? userFormation
						.filter((formation) => formation.id === id)
						.map((formation, index) => (
							<div key={index}>{formation.selectedPlayer}</div>
						))
				:*/ selectedCard}
		</div>
	);
};

export default PlayerCards;
