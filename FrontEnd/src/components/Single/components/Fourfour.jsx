import PlayerCards from './PlayerCards';
import Card from '../../Card/Card';

const Fourfour = ({
	selectedPlayer,
	setSelectedPlayer,
	addPlayerToIndex,
	deletePlayerAtIndex,
	playersOnBoard,playerList,
	setPlayerList,

}) => {
	return (
		<div>
			<div className='forward'>
				<Card
					id={1}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playerList={playerList}
					setPlayerList={setPlayerList}

				/>
				<Card
					id={2}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
			</div>
			<div className='midField'>
				<Card
					id={3}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					deletePlayerAtIndex={deletePlayerAtIndex}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}

				/>
				<Card
					id={4}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
				<Card
					id={5}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					deletePlayerAtIndex={deletePlayerAtIndex}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}

				/>
				<Card
					id={6}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
			</div>
			<div className='defence'>
				<Card
					id={7}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
				<Card
					id={8}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
				<Card
					id={9}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
				<Card
					id={10}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					deletePlayerAtIndex={deletePlayerAtIndex}
					addPlayerToIndex={addPlayerToIndex}
					playersOnBoard={playersOnBoard}

				/>
			</div>
			<div className='goalKeeper'>
				<Card
					id={11}
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
					addPlayerToIndex={addPlayerToIndex}
					deletePlayerAtIndex={deletePlayerAtIndex}
					playersOnBoard={playersOnBoard}

				/>
			</div>
		</div>
	);
};

export default Fourfour;
