import {useState} from 'react';
import './RegisterPageStyle.css';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
    username: yup.string().required('Zorunlu alan'),
    lastName: yup.string().required('Zorunlu alan'),
    password: yup.string().required('Zorunlu alan'),
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

    const HandleSubmit = () => {
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
            .post('http://localhost:5173/register', formdata)
            .then((response) => {})
            .catch((error) => {
                console.log(error);
            });

        setFormData({
            username: '',
            password: '',
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
                        placeholder='Kullanıcı Adı'
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
                        type='text'
                        placeholder='Şifre'
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
