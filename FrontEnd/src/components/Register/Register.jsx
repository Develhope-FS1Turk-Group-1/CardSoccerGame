import { useState } from 'react';
import './RegisterPageStyle.css';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
	username: yup.string().required('Username is a required field'),
	mail: yup
		.string()
		.email('Invalid email')
		.required('Email is a required field'),
	password: yup.string().required('Password is a required field'),
});

const RegisterPage = () => {
	const [formdata, setFormData] = useState({
		username: '',
		mail: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};

	const HandleSubmit = (e) => {
		e.preventDefault();

		validationSchema
			.validate(formdata, { abortEarly: false })
			.then(() => {
				setErrors({});
				axios
					.post('http://localhost:3050/register', formdata)
					.then((response) => {
						console.log(response.data);
						localStorage.setItem(
							'user',
							JSON.stringify(response.data.username),
						);
						navigate('/dashboard');
					})
					.catch((error) => {
						if (error.response) {
							console.error(
								'Server responded with an error:',
								error.response.data,
							);
							setErrors(error.response.data);
						} else if (error.request) {
							console.error(
								'No response received from the server',
                            );
						} else {
							console.error(
								'Error setting up the request:',
								error.message,
							);
						}
					});
			})
			.catch((validationErrors) => {
				const formattedErrors = {};
				validationErrors.inner.forEach((err) => {
					formattedErrors[err.path] = err.message;
				});
                setErrors(formattedErrors);
			});
	};

	return (
		<div className='soccerHomepage'>
			<div className='soccerAllContainer'>
				<div className='soccerSmallContainer'>
					<h1>Free Sign Up!</h1>
					{errors.message && (
						<div className='error'>{errors.message}</div>
					)}
					<input
						className='logInInput'
						type='text'
						placeholder='Username'
						name='username'
						value={formdata.username}
						onChange={handleChange}
					/>
					{errors.username && (
						<div className='error'>{errors.username}</div>
					)}

					<input
						className='logInInput'
						type='email'
						placeholder='Email'
						name='mail'
						value={formdata.mail}
						onChange={handleChange}
					/>
					{errors.mail && <div className='error'>{errors.mail}</div>}

					<input
						className='logInInput'
						type='password'
						placeholder='Password'
						name='password'
						value={formdata.password}
						onChange={handleChange}
					/>
					{errors.password && (
						<div className='error'>{errors.password}</div>
					)}

					<button
						className='logInButton'
						onClick={HandleSubmit}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
