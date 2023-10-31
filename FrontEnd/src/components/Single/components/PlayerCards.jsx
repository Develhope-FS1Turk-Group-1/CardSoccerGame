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
		const dataArray = data.split(',');
		console.log(dataArray);
		addPlayerToIndex(event.target.id-1,{onlineplayerid:dataArray[1],name:dataArray[0]})

		event.target.innerHTML = dataArray[0];
		
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	return (
		<div id={id}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className='player'
			onClick={() => handleClick(id)}>
			{selectedCard}
		</div>
	);
};

export default PlayerCards;
