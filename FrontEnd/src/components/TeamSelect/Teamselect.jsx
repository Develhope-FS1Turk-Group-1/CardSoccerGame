import { useEffect, useState } from 'react';
import './Style.css'
import { useUserProvider } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useRef } from "react"
import LeftArrowBlue from "../../../Assets/TeamSelect/LeftArrowBlue.svg"
import RightArrowBlue from "../../../Assets/TeamSelect/RightArrowBlue.svg"
import LeftArrow from "../../../Assets/TeamSelect/Vector 14.svg"
import RightArrow from "../../../Assets/TeamSelect/Vector 17.svg"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import axios from 'axios';


const Teamselect = () => {
    const { setMoney, money, setLevel, level, userId, setUserId } = useUserProvider();
    const [leagues, setLeagues] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
        // Perform any additional actions based on the selected league if needed
    };

    const handleTeamChange = (event) => {
        console.log(event.target);
        setSelectedTeam(event.target.value);
        // Perform any additional actions based on the selected team if needed
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (userId == 0)
            navigate("/login");

        axios
            .get(`http://localhost:3050/play/getLeagues`)
            .then((response) => {
                console.log(response.data);
                setLeagues(response.data);
                setSelectedLeague(response.data[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, [])



    useEffect(() => {
        axios
            .get('http://localhost:3050/play/getTeams/' + selectedLeague)
            .then((response) => {
                console.log(response.data);
                setTeams(response.data);
                setSelectedTeam(response.data[0].team_name);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [selectedLeague])

    const swiper = useRef(null)
    const goNext = () => {
        if (swiper.current && swiper.current.swiper) {
            swiper.current.swiper.slideNext()
        }
    }
    const goPrev = () => {
        if (swiper.current && swiper.current.swiper) {
            swiper.current.swiper.slidePrev()
        }
    }

    const swiper1 = useRef(null)
    const goNext1 = () => {
        if (swiper1.current && swiper1.current.swiper) {
            swiper1.current.swiper.slideNext()
        }
    }
    const goPrev1 = () => {
        if (swiper1.current && swiper1.current.swiper) {
            swiper1.current.swiper.slidePrev()
        }
    }

    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentSlide1, setCurrentSlide1] = useState(0)

    return (
        <div>
            <div className="teamSelectAllContainer">
                <div className="teamSelectDiv">
                    <div className="leaugeSwiperContainer">
                        <button
                            aria-label="Previous"
                            onClick={() => {
                                if(currentSlide > 0) {
                                    setCurrentSlide(currentSlide - 1)
                                    goPrev();
                                    setSelectedLeague(leagues[currentSlide-1]);
                                    console.log(currentSlide-1)

                                }
                                    
                            }}
                            className="prev-button"
                        >
                            <img src={currentSlide == !1 ? LeftArrow : LeftArrowBlue} alt="Sol Ok" width={100} height={100} />
                        </button>
                        <Swiper ref={swiper} slidesPerView="1" spaceBetween="10px">
                            {leagues.map((league, index) => (
                                <SwiperSlide key={index} value={league}>
                                    {league}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            aria-label="Next"
                            onClick={() => {
                                if(currentSlide < leagues.length - 1){
                                    setCurrentSlide(currentSlide + 1)
                                    goNext();
                                    setSelectedLeague(leagues[currentSlide+1]);
                                    console.log(currentSlide+1)
                                }

                            }}
                            className="next-button"
                        >
                            <img src={currentSlide == leagues.length-1 ? RightArrow : RightArrowBlue} alt="Sag Ok" width={100} height={100} />

                        </button>
                    </div>

                    <div className="teamSwiperContainer">
                        <button
                            aria-label="Previous"
                            onClick={() => {
                                if(currentSlide1 > 0){
                                    setCurrentSlide1(currentSlide1 - 1)
                                    goPrev1();
                                    setSelectedTeam(teams[currentSlide1-1].team_name);
                                    console.log(teams[currentSlide1-1].team_name, currentSlide1-1)
                                }
                                
                            }}
                            className="prev-button"
                        >
                            <img src={currentSlide1 == !1 ? LeftArrow : LeftArrowBlue} alt="Sol Ok" width={100} height={100} />
                        </button>
                        <Swiper ref={swiper1} slidesPerView="1" spaceBetween="10px">
                            {teams.map((team, index) => (
                                <SwiperSlide key={index} value={team.team_name}>
                                    {team.team_name}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            aria-label="Next"
                            onClick={() => {
                                if(currentSlide1 < teams.length - 1){
                                    setCurrentSlide1(currentSlide1 + 1)
                                    goNext1();
                                    setSelectedTeam(teams[currentSlide1+1].team_name);
                                    console.log(teams[currentSlide1+1].team_name)
                                }
                                

                            }}
                            className="next-button"
                        >
                            <img src={currentSlide1 == teams.length-1 ? RightArrow : RightArrowBlue} alt="Sag Ok" width={100} height={100} />

                        </button>
                    </div>




                    <div className='leaugeTeamSelect'>

                        <label>
                            Select League:
                            <select value={selectedLeague} onChange={handleLeagueChange}>
                                <option value="">--Select League--</option>
                                {leagues.map((league, index) => (
                                    <option key={index} value={league}>
                                        {league}
                                    </option>
                                ))}
                            </select>
                        </label>


                        <label>
                            Select Team:
                            <select value={selectedTeam} onChange={handleTeamChange}>
                                <option value="">--Select Team--</option>
                                {teams.map((team, index) => (
                                    <option key={index} value={team.team_name}>
                                        {team.team_name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="ButtonClass">
                        <button id='GrayButton'>BACK</button>
                        <button id='GreenButton' onClick={() => {
                            console.log(selectedTeam, userId)
                            axios
                                .post(`http://localhost:3050/play/playSingle/${selectedTeam}/${userId}`)
                                .then((response) => {
                                    console.log(response.data);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });

                        }}>START</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teamselect;


/*

<div className="playDiv">
                        <h1>Game <span>Day</span></h1>
                        <div className="TeamSelect">
                            <div className="TeamSide">
                                <img id='leftbot' src={arrow} alt="" />
                                <span className="dot"></span>
                                <img src={arrow} alt="" />
                            </div>
                        </div>
                        <div className="TeamSelect">
                            <div className="TeamSide">
                                <img id='leftbot' src={arrow} alt="" />
                                <span className="dot"></span>
                                <img src={arrow} alt="" />
                            </div>
                        </div>
                        </div>

*/

/*

    return (
        <div>
            <div className="DashboardBackground">
                <div className="Dashboarddiv">
                <div>
                <label>
                    Select League:
                    <select value={selectedLeague} onChange={handleLeagueChange}>
                    <option value="">--Select League--</option>
                    {leagues.map((league, index) => (
                        <option key={index} value={league}>
                        {league}
                        </option>
                    ))}
                    </select>
                </label>
                <br />

                <label>
                    Select Team:
                    <select value={selectedTeam} onChange={handleTeamChange}>
                    <option value="">--Select Team--</option>
                    {teams.map((team, index) => (
                        <option key={index} value={team.team_name}>
                        {team.team_name}
                        </option>
                    ))}
                    </select>
                </label>


                    
                        <div className="NameClass">
                            <h3>Opponent</h3>
                        </div>
                        <div className="ButtonClass">
                            <button id='GrayButton'>BACK</button>
                            <button id='GreenButton' onClick={()=>{

                            axios
                                .post(`http://localhost:3050/play/playSingle/${selectedTeam}/${userId}`)
                                .then((response) => {
                                    console.log(response.data);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });

                            }}>START</button>
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

*/