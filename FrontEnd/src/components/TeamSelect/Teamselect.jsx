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
  const { setMoney, money, setLevel, level, userId, setUserId, energy, setEnergy } = useUserProvider();
  const [leagues, setLeagues] = useState([]);
  const [leaguelogos, setLeagueLogos] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedLeagueLogo, setSelectedLeagueLogo] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [resultScreen, setResultScreen] = useState('none');
  const [result, setResult] = useState('none');
  const [blur, setBlur] = useState('blur(0px)');
  const [earnedMoney, setEarnedMoney] = useState('10');
  const navigate = useNavigate();

  const startMatch = () => {
    setResultScreen('flex');
    setBlur('blur(10px)');
    axios
      .post(`http://localhost:3050/play/playSingle/${selectedTeam}/${userId}`)
      .then((response) => {
        setResult(response.data);
        console.log(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  const updateEnergy = async () => {
    console.log(result);
    console.log('Inside fetchData function');
    if (result !== '' && userId !== '') {
      try {
        const response = await axios.post(`http://localhost:3050/updateCountdownPowers`, { userId: userId });
        setEnergy(response.data.data[0].energy);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    if (userId == 0)
      navigate("/login");
    axios
      .get(`http://localhost:3050/play/getLeagues`)
      .then((response) => {
        setLeagues(response.data.map(row => row.league));
        setLeagueLogos(response.data.map(row => row.leaguelogo));
        console.log(leagues);
        setSelectedLeague(response.data[0].league);
        setSelectedLeagueLogo(response.data[0].leaguelogo);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])







  useEffect(() => {
    axios
      .get('http://localhost:3050/play/getTeams/' + selectedLeague)
      .then((response) => {
        console.log(selectedLeague);
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
        <div style={{ filter: blur }} className="teamSelectDiv">
          <h1>SELECT OPPONENT TEAM</h1>
          <div className="leagueSwiperContainer">
            <button
              aria-label="Previous"
              onClick={() => {
                if (currentSlide > 0) {
                  setCurrentSlide(currentSlide - 1)
                  goPrev();
                  setSelectedLeague(leagues[currentSlide - 1]);
                  setSelectedLeagueLogo(leaguelogos[currentSlide - 1]);
                  console.log(currentSlide - 1)
                }
              }}
              className="prev-button"
            >
              <img src={currentSlide == !1 ? LeftArrow : LeftArrowBlue} alt="Sol Ok" width={100} height={100} />
            </button>
            <Swiper ref={swiper} slidesPerView="1" spaceBetween="10px">
              {leagues.map((league, index) => (
                <SwiperSlide key={index} value={league}>
                  <div className='teamSelectLogoLeague'>
                    <img src={selectedLeagueLogo} alt="" />
                    {league}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              aria-label="Next"
              onClick={() => {
                if (currentSlide < leagues.length - 1) {
                  setCurrentSlide(currentSlide + 1)
                  goNext();
                  setSelectedLeague(leagues[currentSlide + 1]);
                  setSelectedLeagueLogo(leaguelogos[currentSlide + 1]);
                  console.log(currentSlide + 1)
                }

              }}
              className="next-button"
            >
              <img src={currentSlide == leagues.length - 1 ? RightArrow : RightArrowBlue} alt="Sag Ok" width={100} height={100} />

            </button>
          </div>

          <div className="teamSwiperContainer">
            <button
              aria-label="Previous"
              onClick={() => {
                if (currentSlide1 > 0) {
                  setCurrentSlide1(currentSlide1 - 1)
                  goPrev1();
                  setSelectedTeam(teams[currentSlide1 - 1].team_name);
                  console.log(teams[currentSlide1 - 1].team_name, currentSlide1 - 1)
                }

              }}
              className="prev-button"
            >
              <img src={currentSlide1 == !1 ? LeftArrow : LeftArrowBlue} alt="Sol Ok" width={100} height={100} />
            </button>
            <Swiper ref={swiper1} slidesPerView="1" spaceBetween="10px">
              {teams.map((team, index) => (
                <SwiperSlide key={index} value={team.team_name}>
                  <div className='teamSelectLogoTeam'>
                    <img src={team.img} alt="" />
                    {team.team_name}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              aria-label="Next"
              onClick={() => {
                if (currentSlide1 < teams.length - 1) {
                  setCurrentSlide1(currentSlide1 + 1)
                  goNext1();
                  setSelectedTeam(teams[currentSlide1 + 1].team_name);
                  console.log(teams[currentSlide1 + 1].team_name)
                }


              }}
              className="next-button"
            >
              <img src={currentSlide1 == teams.length - 1 ? RightArrow : RightArrowBlue} alt="Sag Ok" width={100} height={100} />
            </button>
          </div>



          <div className="ButtonClass">
            <button id='GrayButton' onClick={() => { navigate('/dashboard') }} >BACK</button>
            <button id='GreenButton' onClick={() => {
              startMatch();
              updateEnergy();
            }}>START MATCH!</button>
          </div>
        </div>

        <div className='resultScreen' style={{ display: resultScreen, color: result.userGoal === result.opponentGoal ? 'gray' : result.userGoal > result.opponentGoal ? 'green' : 'red' }}>

          {result == '' ? 'The match is ongoing' :
            result.userGoal > result.opponentGoal ? <div id='winAlert'><div><h1>{result.userGoal} - {result.opponentGoal}</h1><h1>YOU WON!</h1><p>Money Earned: {earnedMoney}$ </p><button id='GreenButton' onClick={() => {
              setResult('');
              setResultScreen('none');
              setBlur('blur(0px)');
            }}>OK</button></div></div> :
              result.userGoal < result.opponentGoal ? <div id='lostAlert'><div><h1>{result.userGoal} - {result.opponentGoal}</h1><h1>YOU LOST!</h1><button id='GreenButton' onClick={() => {
                setResult('');
                setResultScreen('none');
                setBlur('blur(0px)');
              }}>OK</button></div></div> :
                <div id='drawAlert'><div><h1>{result.userGoal} - {result.opponentGoal}</h1><h1>IT'S A DRAW!</h1><button id='GreenButton' onClick={() => {
                  setResult('');
                  setResultScreen('none');
                  setBlur('blur(0px)');
                }}>OK</button></div></div>}
        </div>

      </div>
    </div>
  );
};

export default Teamselect;
