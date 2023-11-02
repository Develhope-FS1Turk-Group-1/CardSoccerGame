import './LandingStyle.css'
import { Link, useNavigate } from 'react-router-dom';
import star from '../../assets/star.png'
import ball from '../../assets/landingBall.png'


const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='landingAllContainer'>
                <div className='landingSmallContainer'>
                    <h1>SOCCER <br /> CARD</h1>
                    <h2>Build Your Own Soccer Empire</h2>
                    <div className='signUpContainer'>
                        <img src={star} alt="star" />
                        <button onClick={() => {
                            navigate('/register')
                        }}>SIGN UP RIGHT NOW</button>
                        <img src={star} alt="star" />
                    </div>
                    <p id='alreadyAccound'>Do you already have an account?</p>
                    <div className='loginContainer'>

                        <img src={ball} alt="ball" />
                        <button onClick={() => {
                            navigate('/login')
                        }} >LOGİN</button>

                    </div>
                    <p className='landingCreateYourTeam'>CREATE YOUR TEAM AND BECOME A STAR!</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
