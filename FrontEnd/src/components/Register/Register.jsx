import {useState} from 'react';
import './RegisterPageStyle.css';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    username: yup.string().required('Required Field'),
    mail: yup.string().required('Required Field'),
    password: yup.string().required('Required Field'),
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

    const HandleSubmit = (e) => {
        setExceptionErrors('');
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
            .post('http://localhost:3050/register', formdata)
            .then((response) => {
                // console.log(response.data)
                
                localStorage.setItem('user', JSON.stringify(response.data.username));
                navigate("/dashboard");
                
            })
            .catch((error) => {
                console.log(error);
                if(error.response.status == 409){
                    setExceptionErrors('User already exists. Please choose a different username or email!!!')
                }
                console.log(error);
            });
    };

    return (
        <div className='soccerHomepage'>
            <div className='soccerAllContainer'>
                <div className='soccerSmallContainer'>
                    {exceptionErrors && <div className='userExceptionError'>{exceptionErrors}</div>}
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
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
