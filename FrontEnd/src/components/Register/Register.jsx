import {useState} from 'react';
import './RegisterPageStyle.css';
import * as yup from 'yup';
import axios from 'axios';

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
            .post('http://localhost:3050/register', formdata)
            .then((response) => {
                if(response.status == 201){
                    console.log(response.data)
                    localStorage.setItem('userId',JSON.stringify(response.data.userid));
                    localStorage.setItem('userName',JSON.stringify(response.data.username));
                    alert("Successfully registered");
                }
            })
            .catch((error) => {
                console.log(error);
            });

        setFormData({
            username: '',
            password: '',
            mail:''
        });
    };

    return (
        <div className='soccerHomepage'>
            <div className='soccerAllContainer'>
                <div className='soccerSmallContainer'>
                    <h1>Ücretsiz Kayıt Ol!</h1>
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
                        Kayıt ol
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
