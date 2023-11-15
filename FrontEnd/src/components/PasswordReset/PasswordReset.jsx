import {useState} from 'react';
import './passwordReset.css';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    username: yup.string().required('Required Field'),
    mail: yup.string().required('Required Field'),
    password: yup.string().required('Required Field'),
});

const PasswordReset = () => {
    const [formdata, setFormData] = useState({
		mail: '',
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
            .validate(formdata, {abortEarly: true})
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
            .post('http://localhost:3050/passwordReset', formdata)
            .then((response) => {
                console.log(response.data)
                alert('Password Successfully Updated.')
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
		<div className='soccerHomepage'>
			<div className='soccerAllContainer'>
				<div className='soccerSmallContainer'>
					<h1>Refresh Password!</h1>
					<input
						className='logInInput'
						type='mail'
						placeholder='Enter your email.'
						name='mail'
						value={formdata.mail}
						onChange={handleChange}
					/>
					{errors.password && <div>{errors.password}</div>}

					<button
						className='logInButton'
						onClick={HandleSubmit}>
						Request Code
					</button>
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
