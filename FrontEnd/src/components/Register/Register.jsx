import {useState} from 'react';
import './RegisterPageStyle.css';
import axios from 'axios';

const RegisterPage = () => {
    const [formdata, setFormData] = useState({
        username: '',
        mail: '',
        password: '',
    });

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

        setFormData('');
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
