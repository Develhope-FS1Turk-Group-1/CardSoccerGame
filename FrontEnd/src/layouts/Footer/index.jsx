import React from 'react'
import './FooterStyle.css'
import ppIcon from './Components/ppiconFooter.svg'
import messageIcon from './Components/messageiconFooter.svg'
import instagramFooter from './Components/instagramFooter.svg'
import linkedinFooter from './Components/linkedinFooter.svg'
import twitterFooter from './Components/twitterFooter.svg'
const Footer = () => {
    return (
        <div>
            <div className='MainFooterComponent'>
                <div className="FooterButtonField">
                    <button>Online</button>
                    <button>Single</button>
                    <button>Versus</button>
                    <button>Market</button>
                    <button>Button5</button>
                    <div className='FooterTwoSideButton'>
                        <button><img src={ppIcon} alt="" /></button>
                        <button><img src={messageIcon} alt="" /></button>
                    </div>
                </div>
                <div className="FooterSocialField">
                    <div className="TopSideSocial">
                        <img src={instagramFooter} alt="" />
                        <img src={twitterFooter} alt="" />
                        <img src={linkedinFooter} alt="" />
                    </div>
                    <h5>@2023 Şirket İsimi</h5>
                </div>
            </div>
        </div>
    );
}

export default Footer