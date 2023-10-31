import { useEffect, useState } from 'react';
import './Style.css'
import arrow from "./arrow-right.svg"
import stad from "./stad.png"
import { useUserProvider } from '../../Contexts/UserContext';
import {Link,useNavigate} from 'react-router-dom';


const Teamselect = () => {
	const{setMoney,money,setLevel,level,userId,setUserId} = useUserProvider();
    const navigate = useNavigate();
    useEffect(() => {
        if(userId == 0)
            navigate("/login");

    }, [])
    return (
        <div>
            <div className="DashboardBackground">
                <div className="Dashboarddiv">
                    <div className="playDiv">
                        <h2 id='TitleText'>SoccerCard</h2>
                        <h1>Maç <span>Günü</span></h1>
                        <div className="TeamSelect">
                            <div className="TeamSide">
                                <img id='lefttop' src={arrow} alt="" />
                                <span className="dot"></span>
                                <img src={arrow} alt="" />
                            </div>
                            <span className="dotvs">VS</span>
                            <div className="TeamSide">
                                <img id='leftbot' src={arrow} alt="" />
                                <span className="dot"></span>
                                <img src={arrow} alt="" />
                            </div>
                        </div>
                        <div className="NameClass">
                            <h3>Takım1</h3>
                            <h3>Takım2</h3>
                        </div>
                        <div className="ButtonClass">
                            <button id='GrayButton'>BACK</button>
                            <button id='GreenButton'>START</button>
                        </div>
                        <div className="stadClass">
                            <img src={stad} alt="" />
                            <h3>Stad İsmi</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teamselect;
