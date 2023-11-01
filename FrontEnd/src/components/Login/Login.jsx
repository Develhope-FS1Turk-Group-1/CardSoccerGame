import { useState } from 'react';
import './LoginPageStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import { useUserProvider } from '../../Contexts/UserContext';

const LoginPage = () => {
	const [formdata, setFormData] = useState({
		mail: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const validationSchema = yup.object({
		mail: yup.string().required('Required'),
		password: yup.string().required('Required'),
	});
	const navigate = useNavigate();
	const { setMoney, setLevel, setUserId } = useUserProvider();

	const handleChange = (e) => {
		setFormData({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};

	const HandleSubmit = (e) => {
		e.preventDefault();
		validationSchema
			.validate(formdata, { abortEarly: true })
			.then(() => {
				setErrors({});
			})
			.catch((err) => {
				const newErrors = {};
				err.inner.forEach((error) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			});
		axios
			.post('http://localhost:3050/login', formdata)
			.then((response) => {
				if (response.data) {
					console.log(response.data);
					//localStorage.setItem('user', JSON.stringify(response.data.username));
					setMoney(response.data.money);
					setUserId(response.data.userId);
					setLevel(response.data.level);
					navigate('/dashboard');
				} else {
					console.log('User session not authorized');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='soccerHomepage'>
			<div className='soccerAllContainer'>
				<div className='soccerSmallContainer'>
					<h1>Welcome</h1>
					<input
						className='logInInput'
						type='email'
						placeholder='Mail'
						name='mail'
						value={formdata.mail}
						onChange={handleChange}
					/>
					{errors.mail && <div>{errors.mail}</div>}
					<input
						className='logInInput'
						type='password'
						placeholder='Password'
						name='password'
						value={formdata.password}
						onChange={handleChange}
					/>
					{errors.password && <div>{errors.password}</div>}
					<div className='remindMe'>
						<div className='checkbox'>
							<input
								type='checkbox'
								id='remindMe'
							/>
							<label htmlFor='remindMe'>Remind me!</label>
						</div>
						<Link to='/passwordReset'>
							<span className='forgottenPassword'>
								Forgot Password
							</span>
						</Link>
					</div>
					<button
						className='logInButton'
						onClick={HandleSubmit}>
						Log in
					</button>
					<Link to='/register'>
						<span className='registerText'>
							Don't you have an account? Sign up!
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
