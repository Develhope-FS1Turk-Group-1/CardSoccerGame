import { useEffect, useState } from 'react';
import '../../../public/css/main.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Fourfour from './components/Fourfour';
import Fourthree from './components/Fourthree';
import Manchester_City from '../../../Assets/Single/Manchester_City.png';
import axios from 'axios';
import { useUserProvider } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import PlayerCards from './components/PlayerCards';
import Card from '../Card/Card';
import { ToastContainer, toast } from 'react-toastify';
import '/node_modules/react-toastify/dist/ReactToastify.css';

const Single = () => {
	const navigate = useNavigate();

	const [formation, setFormation] = useState('FourFourTwo');
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [playerList, setPlayerList] = useState([]);
	const [giftAlert, setGiftAlert] = useState('giftAlertOff');
	const [blur, setBlur] = useState('');
	const [teamInfo, setTeamInfo] = useState({
		logo: '',
		name: '',
		league: '',
		scoreBoard: [],
	});
	const { setMoney, money, setLevel, level, userId, setUserId } =
		useUserProvider();
	const [playersOnBoard, setPlayersOnBoard] = useState([
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	]);

	const [listedPlayers, setListedPlayers] = useState([]);

	const addPlayerToIndex = (index, player) => {
		let players = playersOnBoard;
		players[index] = player;
		setPlayersOnBoard(players);

	};






	const randomPlayer = async () => {
		try {
			const response = await axios.post(`http://localhost:3050/randomplayer`, {
				userId: userId,
			});
			console.log(response);
			setPlayerList(response.data);
			return response.data;
		} catch (error) {
			console.error('Error random player:', error);
			throw error;
		}
	};







	const deletePlayerAtIndex = async(index) => {
		console.log(index);
		let players = playersOnBoard;
		players[index] = null
		console.log(players);

		await setPlayersOnBoard(players);
		console.log(playersOnBoard);

	};

	useEffect(() => {
		if (userId == 0) {
			navigate('/login');
		}

		const initialTeamData = {
			logo: Manchester_City,
			name: 'Team Name',
			league: 'League Name',
			scoreBoard: [5, 1, 0],
		};
		//setUserId(1);
		setTeamInfo(initialTeamData);


		



	}, []);

	useEffect(() => {
		axios
			.post(`http://localhost:3050/getFormationType`, {
				userId: userId
			})
			.then((response) => {
				console.log(response.data.formation);
				setFormation(response.data.formation);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.get(`http://localhost:3050/player/getAllPlayers/${userId}`)
			.then((response) => {
				if (response.data.length == 0) {
					randomPlayer();
					setGiftAlert('giftAlertOn');
				} else {
					setPlayerList(response.data);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.post(`http://localhost:3050/player/loadFormation`, {
				userId: userId,
			})
			.then((response) => {
				console.log(response.data);
				let tempData = response.data.formation;
				for (let i = 0; i < 18; i++) {
					tempData[i].onlineplayerid = tempData[i].playerId;
				}
				setPlayersOnBoard(tempData);
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

	const choosePlayer = (player) => {
		setSelectedPlayer(player);
	};

	const notify = () =>
		toast.success('Formation saved succesfully!', {
			position: 'top-left',
			autoClose: 300,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: false,
			theme: 'colored',
		});

	const saveFormation = () => {
		localStorage.setItem('userFormation', JSON.stringify(playersOnBoard));
		for (const player of playersOnBoard) {
			if (player == null) {
				alert('Fill all positions, including substitutes!!');
				return;
			}
		}

		axios
			.post(`http://localhost:3050/player/saveFormation`, {
				userId: userId,
				players: playersOnBoard,
			})
			.then((response) => {
				console.log(response.data);
				notify();
			})
			.catch((error) => {
				console.error('Error:', error);
			});



			axios
			.post(`http://localhost:3050/updateFormationType`, {
				userId: userId,
				newFormation: formation,
			})
			.then((response) => {
				console.log(response.data);
				notify();
			})
			.catch((error) => {
				console.error('Error:', error);
			});

	};

	const handleDragStart = (event, data) => {
		event.dataTransfer.setData('text/plain', data);
	};


	useEffect(() => {
		const newListing = async () => {
			if (playerList.length !== 0) {
				if (playersOnBoard[1] !== null) {
					const newlist = await playerList.filter(
						(player) =>
							!playersOnBoard.some(
								(formPlayer) =>
									formPlayer.playerId ===
									player.onlineplayerid,
							),
					);
					setListedPlayers(newlist);

				} else {
					console.log("else ");
					setListedPlayers(playerList);
				}
			}
		};

		newListing();
		addPlayerToIndex();
	}, [playersOnBoard, playerList]);


	/*

	*/
	return (
		<div>
			<Header />
			<ToastContainer />
			<div className={giftAlert}>
				<div className='boughtPlayersPopUp'>
					{playerList.length == 0 ? <h1>LOADING...</h1> : playerList.map((index, player) => (
						<div key={player.id} className='playerBought'>
							{
								<Card
									id={player + 1}
									playersOnBoard={playerList}
								/>}
						</div>
					))}
				</div>
				<h3>Embark on an unforgettable journey with our football game, starting with a special gift of 18 players just for you; enjoy the thrill of victory!</h3>
				<button className='button-9' onClick={() => { setBlur(''); setGiftAlert('giftAlertOff'); setBoughtPlayers([]) }}>CLAIM</button>
			</div>
			{playerList.length == 0 ? (
				<div className='formationLoadingAllContainer'>
					<div className='formationLoading'></div>
				</div>
			) : (
				// {playerList.length == 0 ? (
				// 	<div className='formationLoading'>
				// 		<div className='lineContainer'></div>
				// 	</div>
				// ) :
				<div className='formationContainer'>
					<div className='formationBtn'>
						{/* <div className='logo'>
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
						</div> */}
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
								playerList={playerList}
								setPlayerList={setPlayerList}
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
						{listedPlayers.map((player, index) => (
							<div
								onDragStart={(e) =>
									handleDragStart(e, [
										player.name,
										player.onlineplayerid,
									])
								}
								draggable
								className='player' key={index}
								id={player.onlineplayerid}
								onClick={() => choosePlayer(player)}>
								<p>{player.name}</p>
								<p>
									{player.position} &nbsp; {player.power}
								</p>
							</div>
						))}
					</div>
					<div className='playerCards'>
						<div>
							<div className='forward'>
								<Card
									id={12}
									selectedPlayer={selectedPlayer}
									setSelectedPlayer={setSelectedPlayer}
									addPlayerToIndex={addPlayerToIndex}
									deletePlayerAtIndex={deletePlayerAtIndex}
									playersOnBoard={playersOnBoard}
								/>
								<Card
									id={13}
									selectedPlayer={selectedPlayer}
									setSelectedPlayer={setSelectedPlayer}
									addPlayerToIndex={addPlayerToIndex}
									deletePlayerAtIndex={deletePlayerAtIndex}
									playersOnBoard={playersOnBoard}
								/>
								<Card
									id={14}
									selectedPlayer={selectedPlayer}
									setSelectedPlayer={setSelectedPlayer}
									addPlayerToIndex={addPlayerToIndex}
									deletePlayerAtIndex={deletePlayerAtIndex}
									playersOnBoard={playersOnBoard}
								/>
								<Card
									id={15}
									selectedPlayer={selectedPlayer}
									setSelectedPlayer={setSelectedPlayer}
									addPlayerToIndex={addPlayerToIndex}
									deletePlayerAtIndex={deletePlayerAtIndex}
									playersOnBoard={playersOnBoard}
								/>
								<Card
									id={16}
									selectedPlayer={selectedPlayer}
									setSelectedPlayer={setSelectedPlayer}
									addPlayerToIndex={addPlayerToIndex}
									deletePlayerAtIndex={deletePlayerAtIndex}
									playersOnBoard={playersOnBoard}
								/>
								<Card
									id={17}
									selectedPlayer={selectedPlayer}
									setSelectedPlayer={setSelectedPlayer}
									deletePlayerAtIndex={deletePlayerAtIndex}
									addPlayerToIndex={addPlayerToIndex}
									playersOnBoard={playersOnBoard}
								/>
								<Card
									id={18}
									selectedPlayer={selectedPlayer}
									deletePlayerAtIndex={deletePlayerAtIndex}
									setSelectedPlayer={setSelectedPlayer}
									addPlayerToIndex={addPlayerToIndex}
									playersOnBoard={playersOnBoard}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Single;
