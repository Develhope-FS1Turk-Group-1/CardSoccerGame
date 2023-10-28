import { useEffect } from 'react';
import PlayerCards from './PlayerCards';

// eslint-disable-next-line react/prop-types
const Fourthree = ({ selectedPlayer, setSelectedPlayer, addPlayerToIndex, deletePlayerAtIndex, playersOnBoard }) => {
	return (
		<div>
			<div className='forward'>
				<PlayerCards
					id={1}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={2}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={3}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
			</div>
			<div className='midField'>
				<PlayerCards
					id={4}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={5}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={6}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
			</div>
			<div className='defence'>
				<PlayerCards
					id={7}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={8}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={9}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
				<PlayerCards
					id={10}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
			</div>
			<div className='goalKeeper'>
				<PlayerCards
					id={11}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
				/>
			</div>
		</div>
	);
};

export default Fourthree;
