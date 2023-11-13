import React, { useState } from 'react'
import './OnlineStyle.css'
import { useUserProvider } from '../../Contexts/UserContext';
import axios from 'axios';


const Online = () => {
  const { setMoney, money, setLevel, level, userId, setUserId } = useUserProvider();
  const [opponentId, setOpponentId] = useState()

  const startFriendMatch = () => {
    console.log(opponentId, userId)
    axios
        .post(`http://localhost:3050/play/playOnline`, {opponentId:opponentId, userId:userId})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


  return (
    <div>
      <div className='onlineAllContainer'>
        <div className='playContainer'>
          <div className='playRandom'>
            <button id='PlayButton'>PLAY!</button>
          </div>
          <div className='playFriends'>
            <input onChange={(e) => {
              setOpponentId(e.target.value); console.log(opponentTeam)
            }} type="text" placeholder='Enter Your Friend Username' />
            <button onClick={()=>{startFriendMatch()}} id='PlayButton'>PLAY!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Online