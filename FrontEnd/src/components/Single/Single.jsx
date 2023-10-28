import React, { useEffect, useState } from 'react';
import '../../../public/css/main.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Fourfour from './components/Fourfour';
import Fourthree from './components/Fourthree';
import Manchester_City from '../../../Assets/Single/Manchester_City.png';
import axios from 'axios'
import {useParams} from 'react-router-dom';

const Single = () => {

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
	const { userID } = useParams();

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
		const initialTeamData = {
			logo: Manchester_City,
			name: 'Team Name',
			league: 'League Name',
			scoreBoard: [5, 1, 0],
		};
		setTeamInfo(initialTeamData);
		setUserFormation(localFormation || [])
	}, []);

	useEffect(() => {
		axios
			.get(`http://localhost:3050/getAllPlayers/${userID}`)
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
				<div className='playerList'>
					{playerList.slice(0,11).map((player, index) => (
						<div
							className='player'
							key={index}
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
						<span>YEDEK</span>
						{playerList.slice(11).map((player, index) => (
							<div
								key={index}
								className='playerDiv'
								onClick={() => choosePlayer(player)}>
								<img
									src={''}
									alt=''
								/>
								<p>{player.name}</p>
								<p>
									{player.position} &nbsp; {player.att}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Single;
