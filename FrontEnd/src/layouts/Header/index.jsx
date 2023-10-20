import { useState } from 'react';
import './header.css';
import coinImage from '../../assets/coin.png'
import soccerBallImage from '../../assets/soccerBallImage.png'
import logOutIcon from '../../assets/logOutIcon.png'


const Header = () => {
    const [level, setLevel] = useState(5)
    const [coin, setCoin] = useState(5000)
    return (
        <div className='headerAllContainer'>
            <div className='headerSmallContainer'>
                <div className='leftSide'>
                    <div className='levelContainer'>
                        <h3>Level:{level}</h3>
                    </div>
                    <div className='moneyContainer'>
                        <img id='headerCoinImage' src={coinImage} alt="" />
                        <div className='moneyValue'>{coin}</div>
                    </div>
                </div>
                <div className='rightSide'>
                    <img id='soccerImage' src={soccerBallImage} alt="" />
                    Log Out
                    <img id='headerLogOutImage' src={logOutIcon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Header;
