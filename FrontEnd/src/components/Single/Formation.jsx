import { useEffect, useState } from 'react';
import '../../../public/css/main.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Fourfour from './components/Fourfour';
import Fourthree from './components/Fourthree';
import Manchester_City from '../../../Assets/Single/Manchester_City.png';
import axios from 'axios'
import { useUserProvider } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PlayerCards from './components/PlayerCards';


const Single = () => {
	const navigate = useNavigate();

	const [formation, setFormation] = useState('FourFourTwo');
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [playerList, setPlayerList] = useState([])
	const [teamInfo, setTeamInfo] = useState({
		logo: '',
		name: '',
		league: '',
		scoreBoard: [],
	});
	const { setMoney, money, setLevel, level, userId, setUserId } = useUserProvider();

	const [playersOnBoard, setPlayersOnBoard] = useState([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);

	const addPlayerToIndex = (index, player) => {
		let players = playersOnBoard;
		players[index] = player;
		setPlayersOnBoard(players);
	}


	const deletePlayerAtIndex = (index) => {
		let players = playersOnBoard;
		players[index] = null;
		setPlayersOnBoard(players);
	}


	useEffect(() => {

		if (userId == 0) {
			navigate("/login");
		}
		

		const initialTeamData = {
			logo: Manchester_City,
			name: 'Team Name',
			league: 'League Name',
			scoreBoard: [5, 1, 0],
		};
		//setUserId(1);
		console.log(userId);
		setTeamInfo(initialTeamData);
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:3050/player/getAllPlayers/${userId}`)
			.then((response) => {
				console.log(response.data);
				setPlayerList(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.post(`http://localhost:3050/player/loadFormation`,{ userId:userId})
			.then((response) => {
				console.log(response.data);
				setPlayersOnBoard(response.data.formation);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		/*let formation = localStorage.getItem("userFormation");
		console.log(formation);
		if (formation) {
			setPlayersOnBoard(JSON.parse(formation));
		}*/
		

	}, []);

	useEffect(() => { console.log(playersOnBoard); }, [playersOnBoard])


	const choosePlayer = (player) => {
		setSelectedPlayer(player);
	};

	const saveFormation = () => {
		localStorage.setItem('userFormation', JSON.stringify(playersOnBoard));

		axios
			.post(`http://localhost:3050/player/saveFormation`,{ userId:userId, players:playersOnBoard })
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	};

	const handleDragStart = (event, data) => {
		event.dataTransfer.setData('text/plain', data);
	};

	return (
		<div>
			<Header />
			<div className='formationContainer'>
				<div className='formationBtn'>
					<div className='logo'>
						<div className='image'>
							<img
								src={teamInfo.logo}
								alt='logo'
							/>
						</div>
						<div className='scoreCard'>
							<h2>{teamInfo.league}</h2>
							<h1>{teamInfo.name}</h1>
							<h2>
								<span>{teamInfo.scoreBoard[0]}</span> -{' '}
								<span>{teamInfo.scoreBoard[1]}</span> -{' '}
								<span>{teamInfo.scoreBoard[2]}</span>
							</h2>
						</div>
					</div>
					<button onClick={() => setFormation('FourFourTwo')}>
						<span>Type :</span> 4-4-2
					</button>
					<button onClick={() => setFormation('FourThreeThree')}>
						<span>Type :</span> 4-3-3
					</button>
					<button onClick={saveFormation}>Save Formation</button>
				</div>
				<div className='lineContainer'>
					{formation == 'FourFourTwo' ? (
						<Fourfour
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}

							saveFormation={saveFormation}
							addPlayerToIndex={addPlayerToIndex}
							deletePlayerAtIndex={deletePlayerAtIndex}
							playersOnBoard={playersOnBoard}
						/>
					) : (
						<Fourthree
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}

							saveFormation={saveFormation}
							addPlayerToIndex={addPlayerToIndex}
							deletePlayerAtIndex={deletePlayerAtIndex}
							playersOnBoard={playersOnBoard}
						/>
					)}
				</div>
				<div className='playerList'>
					{playerList.map((player, index) => (
						<div
							onDragStart={(e) => handleDragStart(e, [player.name,player.onlineplayerid])}
							draggable
							className='player'
							key={index}
							id={player.onlineplayerid}
							onClick={() => choosePlayer(player)}>
							<p>{player.name}</p>
							<p>
								{player.position} &nbsp; {player.att}
							</p>
						</div>
					))}
				</div>
				<div className='playerCards'>
					<div>
						<span>SUBTİTUTE</span>
						<div className='forward'>
							<PlayerCards
								id={12}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
							<PlayerCards
								id={13}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
							<PlayerCards
								id={14}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
							<PlayerCards
								id={15}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
							<PlayerCards
								id={16}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
							<PlayerCards
								id={17}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
							<PlayerCards
								id={18}
								selectedPlayer={selectedPlayer}
								setSelectedPlayer={setSelectedPlayer}
								addPlayerToIndex={addPlayerToIndex}
								playersOnBoard={playersOnBoard}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Single;