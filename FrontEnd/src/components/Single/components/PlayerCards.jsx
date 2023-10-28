import { useEffect, useState } from 'react';

const PlayerCards = ({
	selectedPlayer,
	setSelectedPlayer,
	id,
	userFormation,
	setUserFormation,
}) => {
	const [selectedCard, setSelectedCard] = useState(null);

	const handleClick = (cardId) => {
		if (id === cardId) {
			setSelectedCard(selectedPlayer);

		}
		setSelectedPlayer(null);
	};
	return (
		<div
			className='player'
			onClick={() => handleClick(id)}>
			{userFormation.length > 0 &&
			id === userFormation[userFormation.length - 1].id
				? userFormation
						.filter((formation) => formation.id === id)
						.map((formation, index) => (
							<div key={index}>{formation.selectedPlayer}</div>
						))
				: selectedCard}
		</div>
	);
};

export default PlayerCards;
