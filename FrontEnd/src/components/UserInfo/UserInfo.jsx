import  { useEffect, useState } from 'react';
import axios from 'axios';
import './UserInfo.css';
import { useUserProvider } from '../../Contexts/UserContext';
import { useParams, useNavigate } from 'react-router-dom';

const UserInfo = () => {
	const [teamName, setTeamName] = useState();
	const { userId } = useUserProvider();
	const [email, setEmail] = useState();
	const [isOpen, setIsOpen] = useState([true, false, false]);
	const { resetToken } = useParams();
	const [newPassword, setNewPassword] = useState('');
	const [error, setError] = useState('');
	const [isText, setIsText] = useState(false);
	const [power, setPower] = useState();
	const [history, setHistory] = useState();
	const [displayCount, setDisplayCount] = useState(5);

	useEffect(() => {
		axios.get(`http://localhost:3050/getUser/${userId}`).then((res) => {
			setTeamName(res.data.username);
			setEmail(res.data.email);
		});
	}, [userId]);

	const setClosing = (id) => {
		setIsOpen(() => {
			switch (Number(id)) {
				case 1:
					return [true, false, false];

				case 2:
					return [false, true, false];

				case 3:
					return [false, false, true];

				case 4:
					return [false, false, false];

				default:
					return [true, false, false];
			}
		});
	};

	const navigate = useNavigate();

	const resetPassword = async () => {
		try {
			// Send a request to your server to update the password
			const response = await axios.post('http://localhost:3050/reset-password', {
				resetToken,
				newPassword,
			});

			// Assuming your server sends a success message
			if (response.data.success) {
				// Redirect to the login page after successful password reset
				navigate('/login');
			} else {
				setError('Password reset failed. Please try again.');
			}
		} catch (error) {
			console.error('Error resetting password:', error);
			setError('Internal server error. Please try again later.');
		}
	};

	const typeText = () => {
		setIsText(!isText);
	};

	const getStats = () => {
		axios
			.get(`http://localhost:3050/play/teampower/${userId}`)
			.then((response) => {
				setPower(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const getHistory = () => {
		axios
			.get(`http://localhost:3050/play/getHistory/${userId}`, {
				params: {
					displayCount: displayCount,
				},
			})
			.then((response) => {
				setHistory(response?.data.history);
			})
			.catch((error) => {
				console.error('Hata:', error);
			});
	};

	useEffect(() => {
		getStats();
		getHistory()
	}, []);


	const handleChange = (e) => {
		const count = parseInt(e.target.value);
		setDisplayCount(count);
	}

	return (
		<div className='infoContainer'>
			<div className='leftside'>
				<div className='username'>
					<h1>{teamName ? 'Team : ' + teamName : '*****'}</h1>
				</div>
				<div className='statsSection'>
					<h1
						id={1}
						onClick={(e) => setClosing(e.target.id)}>
						Match History
					</h1>
					<h1
						id={2}
						onClick={(e) => setClosing(e.target.id)}>
						Stats
					</h1>
				</div>
				<div className='setttings'>
					<h1
						id={3}
						onClick={(e) => setClosing(e.target.id)}>
						Settings
					</h1>
				</div>
				<div className='help'>
					<h1>Help & Support</h1>
				</div>
			</div>
			<div className='rightside'>
				<div className='dashboard'>
					<h1>Stats and Settings</h1>
				</div>
				<div className='activePanel'>
					<div className={`historyPanel ${isOpen[0] ? 'flex' : 'none'}`}>
						<div className={`historyInput `}>
							<span>Latest Matchs</span>
							<input
								type='number'
								value={displayCount}
								onChange={(e) =>handleChange(e) }
							/>
							<button onClick={() => getHistory()}>Filter History</button>
						</div>
						<ol className='matchList'>
							{history
								?.slice(0, displayCount)
								.sort((a, b) => b.id - a.id)
								.map((match, index) => {
									return (
										<li key={index}>
											<p>{match?.opponentusername} </p>

											<span className='result'>
												{match?.opponentgoal}-{match?.usergoal}
											</span>
											{match?.opponentgoal == match?.usergoal ? (
												<span className='draw'>Draw</span>
											) : '' || match?.opponentgoal > match?.usergoal ? (
												<span className='defeat'>Defeat</span>
											) : (
												<span className='victory'>Victory</span>
											)}
										</li>
									);
								})}
						</ol>
					</div>
					<div className={`statsPanel ${isOpen[1] ? 'block' : 'none'}`}>
						<div className='att'>
							<div>
								<h1>ATT Power</h1>
							</div>

							<h2>{power?.attPower}</h2>
						</div>
						<div className='mid'>
							<div>
								<h1>MID Power</h1>
							</div>

							<h2>{power?.midPower}</h2>
						</div>
						<div className='def'>
							<div>
								<h1>DEF Power</h1>
							</div>

							<h2>{power?.defPower}</h2>
						</div>
						<div className='gk'>
							<div>
								<h1>GK Power</h1>
							</div>

							<h2>{power?.gkPower}</h2>
						</div>
						<div className='total'>
							<div>
								<h1>Total Power</h1>
							</div>

							<h2>{power?.teamPower}</h2>
						</div>
					</div>
					<div className={`settingsPanel ${isOpen[2] ? 'block' : 'none'}`}>
						<div className='username'>
							<span>Username</span>
							<input
								type='text'
								value={teamName}
							/>
						</div>
						<div className='email'>
							<span>E-mail</span>
							<input
								type='text'
								value={email}
							/>
						</div>
						<div className='password'>
							<span>Password</span>
							<input
								onClick={typeText}
								type={isText ? 'text' : 'password'}
								id='newPassword'
								name='newPassword'
								placeholder='New Password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
							<button onClick={resetPassword}>Reset Pasword</button>
						</div>
						{error && <p style={{ color: 'red' }}>{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
