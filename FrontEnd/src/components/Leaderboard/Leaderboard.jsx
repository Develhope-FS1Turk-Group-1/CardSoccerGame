import { Link, useNavigate } from 'react-router-dom';
import './LeaderboardStyle.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Leaderboard = () => {
  const navigate = useNavigate();
  const [usersTeamPower, setUsersTeamPower] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3050/play/rank'); // Replace '/your-api-endpoint' with the actual endpoint URL
        setUsersTeamPower(response.data.usersTeamPower);
      } catch (error) {
        console.error('Error fetching users\' team power:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts


  return (
    <div>

      <div className='leaderboardAllContainer'>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>XP</th>
              <th>Team Power</th>
            </tr>
          </thead>
          <tbody>
            {usersTeamPower.map((user, index) => (
              <tr key={user.userId}>
                <td
                  id={
                    index === 0 ? 'firstPlace' :
                      index === 1 ? 'secondPlace' :
                        index === 2 ? 'thirdPlace' : ''
                  }
                  className='userRank'>{index + 1}</td>
                <td id={
                  index === 0 ? 'firstPlace' : 
                  index === 1 ? 'secondPlace' : 
                  index === 2 ? 'thirdPlace' : ''
                } className='username'>{user.username}</td>
                <td id={
                  index === 0 ? 'firstPlace' : 
                  index === 1 ? 'secondPlace' : 
                  index === 2 ? 'thirdPlace' : ''
                } className='userxp'>{user.xp}</td>
                <td id={
                  index === 0 ? 'firstPlace' : 
                  index === 1 ? 'secondPlace' : 
                  index === 2 ? 'thirdPlace' : ''
                } className='userpower'>{user.teamPower}</td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard