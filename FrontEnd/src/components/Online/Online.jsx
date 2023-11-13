import React from 'react'
import './OnlineStyle.css'


const Online = () => {
  return (
    <div>
      <div className='onlineAllContainer'>
        <div className='playContainer'>
          <div className='playRandom'>
            <button id='PlayButton'>PLAY!</button>
          </div>
          <div className='playFriends'>
            <input type="text" placeholder='Enter Your Friend Username' />
            <button id='PlayButton'>PLAY!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Online