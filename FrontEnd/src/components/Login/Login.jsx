import {useState} from 'react';
import './LoginPageStyle.css';
import {Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
    username: yup.string().required('Zorunlu alan'),
    lastName: yup.string().required('Zorunlu alan'),
    password: yup.string().password('Geçersiz Şifre').required('Zorunlu alan'),
});

const LoginPage = () => {
    const [formdata, setFormData] = useState({
        username: '',
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
            .validate(formData, {abortEarly: true})
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
                    <h1>Hoş Geldin</h1>
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
                        type='text'
                        placeholder='Şifre'
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
                            <label for='remindMe'>Beni hatırla</label>
                        </div>
                        <Link to='/passwordReset'>
                            <span className='forgottenPassword'>Şifremi Unuttum</span>
                        </Link>
                    </div>
                    <button
                        className='logInButton'
                        onClick={HandleSubmit}>
                        Giriş Yap
                    </button>
                    <Link to='/register'>
                        <span className='registerText'>Henüz Hesabın Yok Mu? Kayıt Ol!</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
