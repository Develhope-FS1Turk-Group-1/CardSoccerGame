import { useState } from 'react';
import './header.css';
import coinImage from '../../assets/coin.png'
import soccerBallImage from '../../assets/soccerBallImage.png'
import logOutIcon from '../../assets/logOutIcon.png'
import { useUserProvider } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const{setMoney,money,setLevel,level,userId,setUserId} = useUserProvider();

    const navigate = useNavigate();
    return (
        <div className='headerAllContainer'>
            <div className='headerSmallContainer'>
                <div className='leftSide'>
                    <div className='levelContainer'>
                        <h3>Level:{level}</h3>
                    </div>
                    <div className='moneyContainer'>
                        <img id='headerCoinImage' src={coinImage} alt="" />
                        <div className='moneyValue'>{money}</div>
                    </div>
                </div>
                <div className='rightSide' onClick={()=>{
                    console.log("Log Out")
                    setUserId(0);
                    navigate('/login');
                }}>

                    <img id='soccerImage' src={soccerBallImage} alt="" />
                    Log Out
                    <img id='headerLogOutImage' src={logOutIcon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Header;
