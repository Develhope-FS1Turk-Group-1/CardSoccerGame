import  { useEffect, useState } from 'react';
import '../../../public/css/main.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Fourfour from './components/Fourfour';
import Fourthree from './components/Fourthree';
import Manchester_City from '../../../Assets/Single/Manchester_City.png';
import axios from 'axios'
import { useUserProvider } from '../../Contexts/UserContext';
import {useNavigate} from 'react-router-dom';

const Single = () => {
	const navigate = useNavigate();

	const [formation, setFormation] = useState('FourFourTwo');
	const [userFormation, setUserFormation] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [playerList, setPlayerList] = useState([])
	const [teamInfo, setTeamInfo] = useState({
		logo: '',
		name: '',
		league: '',
		scoreBoard: [],
	});
	const{setMoney,money,setLevel,level,userId,setUserId} = useUserProvider();

	const[playersOnBoard,setPlayersOnBoard] = useState([null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]);

	const addPlayerToIndex = (index,player) =>{
		let players = playersOnBoard;
		players[index] = player;
		setPlayersOnBoard(players);
	}


	const deletePlayerAtIndex = (index) =>{
		let players = playersOnBoard;
		players[index] = null;
		setPlayersOnBoard(players);
	}

	const localFormation = JSON.parse(localStorage.getItem('userFormation'))||[];

	useEffect(() => {
		if(userId == 0){
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
		setUserFormation(localFormation || [])
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:3050/getAllPlayers/${userId}`)
			.then((response) => {
				console.log(response.data);
				setPlayerList(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		let formation = localStorage.getItem("userFormation");
		console.log(formation);
		if(formation){
			setPlayersOnBoard(JSON.parse(formation));
		}

	}, []);

	useEffect(() => {console.log(playersOnBoard);},[playersOnBoard])


	const choosePlayer = (player) => {
		setSelectedPlayer(player.name);
	};

	const saveFormation = () => {
		console.log(playersOnBoard);
		localStorage.setItem('userFormation', JSON.stringify(playersOnBoard));
	};

	const handleDragStart = (event, data) => {
		event.dataTransfer.setData('text/plain', data);
	};

	return (
		<div>
			<Header />
			<div className="formationContainer">
				<div className="formationBtn">
					<div className="logo">
						<div className="image">
							<img
								src={teamInfo.logo}
								alt="logo"
							/>
						</div>
						<div className="scoreCard">
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
				<div className="lineContainer">
					{formation == 'FourFourTwo' ? (
						<Fourfour
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}
							userFormation={userFormation}
							setUserFormation={setUserFormation}
							saveFormation={saveFormation}
							addPlayerToIndex={addPlayerToIndex}
							deletePlayerAtIndex={deletePlayerAtIndex}
							playersOnBoard={playersOnBoard}
						/>
					) : (
						<Fourthree
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}
							userFormation={userFormation}
							setUserFormation={setUserFormation}
							addPlayerToIndex={addPlayerToIndex}
							deletePlayerAtIndex={deletePlayerAtIndex}
							playersOnBoard={playersOnBoard}
						/>
					)}
				</div>
				<div className="playerList">
					{playerList.slice(0, 11).map((player, index) => (
						<div
							onDragStart={(e) => handleDragStart(e, player.name)}
							draggable
							className="player"
							key={index}
							onClick={() => choosePlayer(player)}
						>
							<p>{player.name}</p>
							<p>
								{player.position} &nbsp; {player.att}
							</p>
						</div>
					))}
				</div>
				<div className="playerCards">
					<div>
						<span>YEDEK</span>
						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[11].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[11])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[11].name}</p>
							<p>
								{playerList[11].position} &nbsp;{' '}
								{playerList[11].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[11].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[11])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[11].name}</p>
							<p>
								{playerList[11].position} &nbsp;{' '}
								{playerList[11].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[11].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[11])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[11].name}</p>
							<p>
								{playerList[11].position} &nbsp;{' '}
								{playerList[11].att}
							</p>
						</div>


						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[12].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[12])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[12].name}</p>
							<p>
								{playerList[12].position} &nbsp;{' '}
								{playerList[12].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[13].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[13])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[13].name}</p>
							<p>
								{playerList[13].position} &nbsp;{' '}
								{playerList[13].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[14].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[14])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[14].name}</p>
							<p>
								{playerList[14].position} &nbsp;{' '}
								{playerList[14].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[15].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[15])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[15].name}</p>
							<p>
								{playerList[15].position} &nbsp;{' '}
								{playerList[15].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[16].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[16])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[16].name}</p>
							<p>
								{playerList[16].position} &nbsp;{' '}
								{playerList[16].att}
							</p>
						</div>

						<div
							onDragStart={(e) =>
								handleDragStart(e, playerList[17].name)
							}
							draggable
							className="playerDiv"
							onClick={() => choosePlayer(playerList[17])}
						>
							<img
								src={''}
								alt=""
							/>
							<p>{playerList[17].name}</p>
							<p>
								{playerList[17].position} &nbsp;{' '}
								{playerList[17].att}
							</p>
						</div>


					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Single;
