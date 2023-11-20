import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserInfo.css';
import { useUserProvider } from '../../Contexts/UserContext';
import { useParams } from 'react-router-dom';

const UserInfo = () => {
	const [teamName, setTeamName] = useState();
	const { userId } = useUserProvider();
	const [email, setEmail] = useState();
    const [ isOpen, setIsOpen ] = useState([ true, false, false ]);
    const { resetToken } = useParams();
    const [ newPassword, setNewPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [isText, setIsText] = useState(false)

	useEffect(() => {
		axios.get(`http://localhost:3050/getUser/${userId}`).then((res) => {
			setTeamName(res.data.username);
			setEmail(res.data.email);
		});
	}, [userId]);

	const setClosing = (id) => {
		setIsOpen((prevState) => {
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
        setIsText(!isText)
    }


    function calculateTotalAtt(players) {
		return players.reduce((total, player) => total + player.att, 0);
	}
	function calculateTotalMid(players) {
		return players.reduce((total, player) => total + player.mid, 0);
	}
	function calculateTotalDef(players) {
		return players.reduce((total, player) => total + player.def, 0);
    }

    useEffect(() => {

        axios.get(`http://localhost:3050/player/get-all-formation/${userId}`).then((res) => console.log(res.data));



    }, [])


	return (
		<div className='infoContainer'>
			<div className='leftside'>
				<div className='username'>
					<h1>{teamName ? teamName : '*****'}</h1>
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
					<div className='historyPanel'>
						<div className={`historyInput ${isOpen[0] ? 'block' : 'none'}`}>
							<span>Latest Matchs</span>
							<input type='text' />
							<button>Filter History</button>
						</div>
						<div className='mactchList'></div>
					</div>
					<div className={`statsPanel ${isOpen[1] ? 'block' : 'none'}`}>
						<div className='att'>
							<div>
								<h1>ATT Power</h1>
							</div>

							<h2>puan</h2>
						</div>
						<div className='mid'>
							<div>
								<h1>MID Power</h1>
							</div>

							<h2>puan</h2>
						</div>
						<div className='def'>
							<div>
								<h1>DEF Power</h1>
							</div>

							<h2>puan</h2>
						</div>
						<div className='gk'>
							<div>
								<h1>GK Power</h1>
							</div>

							<h2>puan</h2>
						</div>
						<div className='total'>
							<div>
								<h1>Total Power</h1>
							</div>

							<h2>puan</h2>
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