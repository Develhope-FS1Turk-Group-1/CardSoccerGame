import { useState } from 'react';
import './RegisterPageStyle.css';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = yup.object({
	username: yup.string().required('Username is a required field'),
	mail: yup.string().email('Invalid email address').required('Email is a required field'),
	password: yup.string().required('Password is a required field'),
});

const RegisterPage = () => {
	const [formdata, setFormData] = useState({
		username: '',
		mail: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const [exceptionErrors, setExceptionErrors] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formdata,
			[e.target.name]: e.target.value,
		});
	};

	const notify = () =>
		toast.success(
			`User registered successfully!!\nCheck your email and activate your account.`,
			{
				position: 'top-center',
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: false,
				theme: 'colored',
			},
		);

	const HandleSubmit = async (e) => {
		setExceptionErrors('');
		e.preventDefault();

		try {
			await validationSchema.validate(formdata, { abortEarly: false });

			const response = await axios.post(
				'http://localhost:3050/register',
				formdata,
			);

			notify();

			if (response) {
				setTimeout(() => {
					navigate('/login');
				}, 4000);
			}
		} catch (err) {
			if (err.inner) {
				// Handle Yup validation errors
				const newErrors = {};
				err.inner.forEach((error) => {
				  newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			} else {
				// Handle other errors, such as network errors or server errors
				setExceptionErrors(err.response.data.message);
			}
		}
	};

	return (
		<div className='soccerHomepage'>
			<ToastContainer />
			<div className='soccerAllContainer'>
				<div className='soccerSmallContainer'>
					{exceptionErrors && (
						<div className='userExceptionError'>
							{exceptionErrors}
						</div>
					)}
					<h1>Free Sign Up!</h1>
					<input
						className='logInInput'
						type='text'
						placeholder='Username'
						name='username'
						value={formdata.username}
						onChange={handleChange}
					/>
					{errors.username && <div>{errors.username}</div>}

					<input
						className='logInInput'
						type='email'
						placeholder='Email'
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

					<button
						className='logInButton'
						onClick={HandleSubmit}>
						Sign up
					</button>
					<Link to='/login'>
						<span className='loginText'>
							Go to Login Page!
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
