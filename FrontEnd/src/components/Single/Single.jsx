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
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [playerList, setPlayerList] = useState([])
	const [teamInfo, setTeamInfo] = useState({
		logo: '',
		name: '',
		league: '',
		scoreBoard: [],
	});
	const {userID} = useParams();


	useEffect(() => {
		const initialTeamData = {
			logo: Manchester_City,
			name: 'Team Name',
			league: 'League Name',
			scoreBoard: [5, 1, 0],
		};
		setTeamInfo(initialTeamData);
	}, []);

	useEffect(() => {
		axios.get(`http://localhost:3050/getAllPlayers/${userID}`)
			.then(response => {
				setPlayerList(response.data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}, []);


	const choosePlayer = (player) => {
		setSelectedPlayer(player.name);
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
				</div>
				<div className='lineContainer'>
					{formation == 'FourFourTwo' ? (
						<Fourfour
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}
						/>
					) : (
						<Fourthree
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}
						/>
					)}
				</div>
				<div className='playerList'>
					{playerList.map((player, index) => (
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
					
					{playerList.map((player, index) => (
						<div
							key={index}
							className='playerDiv'
							onClick={() => choosePlayer(player)}>
							<img
								src={''}
								alt=''
							/>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Single;
