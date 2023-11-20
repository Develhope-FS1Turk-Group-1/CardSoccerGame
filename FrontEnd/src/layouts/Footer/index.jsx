import React from 'react'
import './FooterStyle.css'
import ppIcon from './Components/ppiconFooter.svg'
import podiumIcon from './Components/podiumIcon.svg'
import instagramFooter from './Components/instagramFooter.svg'
import linkedinFooter from './Components/linkedinFooter.svg'
import twitterFooter from './Components/twitterFooter.svg'
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='MainFooterComponent'>
                <div className="FooterButtonField">
                    <button onClick={() => {
                        navigate('/online');
                    }}
                    >Online</button>
                    <button onClick={() => {
                        navigate('/single');
                    }}
                    >Single</button>
                    <button onClick={() => {
                        navigate('/formation');
                    }}>Team</button>
                    <button onClick={() => {
                        navigate('/market');
                    }}>Market</button>
                    <div className='FooterTwoSideButton'>
                        <button><img src={ppIcon} alt="" /></button>
                        <button
                            onClick={() => {
                                navigate('/leaderboard');
                            }}
                        ><img src={podiumIcon} alt="" /></button>
                    </div>
                </div>
                <div className="FooterSocialField">
                    <div className="TopSideSocial">
                        <img src={instagramFooter} alt="" />
                        <img src={twitterFooter} alt="" />
                        <img src={linkedinFooter} alt="" />
                    </div>
                    <h5>@2023 SoccerCard</h5>
                </div>
            </div>
        </div>
    );
}

export default Footer