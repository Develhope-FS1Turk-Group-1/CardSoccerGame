import React from 'react';
import './CardStyle.css'; // Your CSS file for styling
import { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({
	selectedPlayer,
	setSelectedPlayer,
	id,
	addPlayerToIndex,
	deletePlayerAtIndex,
	playersOnBoard,
	playerList,
	setPlayerList,
	addPlayerToListedPlayers,

}) => {
	const [selectedCard, setSelectedCard] = useState(null);

	useEffect(() => {
		//console.log(playersOnBoard[id-1]);
		//console.log(id);
		//console.log(playersOnBoard);
		if (playersOnBoard[id - 1] != null) {
			setSelectedCard(playersOnBoard[id - 1]);
		}
		else{
			setSelectedCard(null);
		}
	}, [playersOnBoard[id-1]]);

	/*useEffect(() => {
		console.log("saaaa");
	}, [playersOnBoard[id-1]]);*/

	// const handleClick = (cardId) => {
	//   console.log(selectedPlayer)
	//   if (id === cardId) {
	//     setSelectedCard(selectedPlayer.name);
	//     addPlayerToIndex(id - 1, selectedPlayer);
	//   }
	//   setSelectedPlayer(null);
	// };

	const handleDrop = async (event) => {
		event.preventDefault();
		const data = event.dataTransfer.getData('text/plain');
		const dataArray = data.split(',');
		//console.log(dataArray, "bıraktım gitti");



		try {
			const response = await axios.get(
				`http://localhost:3050/player/getPlayerById/${dataArray[1]}`,
			);

			if (response.status === 200) {

				
				console.log("sa over");
				//await addPlayerToListedPlayers(selectedCard);
				
				let player = response.data.player;
				player.onlineplayerid = dataArray[1];
				player.playerId = dataArray[1];
				player.positionId = id;
				setSelectedCard(player);
				addPlayerToIndex(id - 1, player);
				

				//console.log(playersOnBoard);
				//event.target.innerHTML = dataArray[0];

			} else {
				console.error(
					`Error fetching player details: ${response.data}`,
				);
			}

		} catch (error) {
			console.error('Error fetching player details:', error);
		}
	};

	const handleDragOver = async (event) => {
		event.preventDefault();

	};
	const handleDragEnd = async (event) => {
		event.preventDefault();
		
		await deletePlayerAtIndex(id-1);
		setSelectedCard(playersOnBoard[id-1]);


	};
	const handleDragStart = (event, data) => {
		let obj = data;
		obj.push(id);
		event.dataTransfer.setData('text/plain', obj);

		
	};

	return (
		<div
			onDragStart={(e) =>
				handleDragStart(e, [
					selectedCard.name,
					selectedCard.onlineplayerid,
				])
			}
			draggable
			className='player-card'
			id={id}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onDragEnd = {handleDragEnd}
			>
			
			{selectedCard?.name ? (
				<>
					<div className='player-details'>
						<div className='player-name'>
							<h2>{selectedCard?.name}</h2>
						</div>

						<div className='player-image'>
							<img
								src={selectedCard?.img}
								alt='Football Player'
							/>
							<span className='number'>
								{selectedCard?.power}
							</span>
						</div>
					</div>
					<div className='positions'>
						<div className='left'>
							<p> {selectedCard?.att} ATT </p>
							<p> {selectedCard?.def} DEF </p>
						</div>
						<div className='right'>
							<p> {selectedCard?.mid} MID </p>
							<p> {selectedCard?.gk} GK </p>
						</div>
					</div>
				</>
			) : (
				<>DRAG SOMEONE</>
			)}
		</div>
	);
};

export default Card;
