import React, { useState } from 'react'
import './OnlineStyle.css'
import { useUserProvider } from '../../Contexts/UserContext';
import axios from 'axios';


const Online = () => {
  const { setMoney, money, setLevel, level, userId, setUserId } = useUserProvider();
  const [opponentId, setOpponentId] = useState()

  const [resultScreen, setResultScreen] = useState('none');
  const [result, setResult] = useState('none');
  const [blur, setBlur] = useState('blur(0px)');
  const [earnedMoney, setEarnedMoney] = useState('10');

  const startFriendMatch = () => {
    setResultScreen('flex');
    setBlur('blur(10px)');
    console.log(opponentId, userId)
    axios
      .post(`http://localhost:3050/play/playOnline`, { opponentId: opponentId, userId: userId })
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  return (
    <div>
      <div className='onlineAllContainer'>
        <div style={{ filter: blur }} className='playContainer'>
          <div className='playRandom'>
            <button id='PlayRandomButton'>PLAY!</button>
          </div>
          <div className='playFriends'>
            <div className='searchContainer'>
              <input onChange={(e) => {
                setOpponentId(e.target.value);
              }} type="text" placeholder='Enter Your Friend Username' />
              <button onClick={() => { startFriendMatch() }} id='PlayFriendButton'>PLAY!</button>
            </div>
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
  )
}

export default Online