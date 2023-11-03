import { useEffect, useState } from 'react';
import './Style.css'
import arrow from "./arrow-right.svg"
import stad from "./stad.png"
import { useUserProvider } from '../../Contexts/UserContext';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';


const Teamselect = () => {
	const{setMoney,money,setLevel,level,userId,setUserId} = useUserProvider();
    const[leagues,setLeagues] = useState([]);
    const[teams,setTeams] = useState([]);
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
        if(userId == 0)
            navigate("/login");

            axios
			.get(`http://localhost:3050/getLeagues`)
			.then((response) => {
				console.log(response.data);
				setLeagues(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
        

    }, [])



    useEffect(() => {
        axios
            .get('http://localhost:3050/getTeams/'+selectedLeague)
            .then((response) => {
                console.log(response.data);
                setTeams(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [selectedLeague])



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