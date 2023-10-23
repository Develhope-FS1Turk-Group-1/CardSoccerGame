import React, { useState } from 'react'
import '../../../public/css/main.css';
import casual from '../../../Assets/Market/casual.jpg';
import rare from '../../../Assets/Market/rare.jpg';
import legend from '../../../Assets/Market/legend.jpg';
import coin from '../../../Assets/Market/coin.png';


const Market = () => {

  const [bought, setBought] = useState([])

  const casualPlayers = [
  ]
  const rarePlayers = [
  ]
  const legendPlayers = [
  ]

  const buyCasual = () => {
    setBought(casualPlayers)
  }
  const buyRare = () => {
    setBought(rarePlayers)
  }
  const buyLegend = () => {
    setBought(legendPlayers)
  }

  return (
    <div className='soccerMarket'>
      <div className='marketAllContainer'>
        <div className='marketSmallContainer'>
          <h1>CARD MARKET</h1>
          <div className='marketCardContainer'>
            <div className='cardContainer'>
              <div className='casualUpperCard'>
                <h3>CASUAL</h3>
                <h5>70+ PLAYER</h5>
                <div id='cardImage' onClick={buyCasual}>
                </div>
                <div className='marketCardPrice' onClick={buyCasual}>
                  <b >10</b>
                  <img id='marketCoinImage' src={coin} alt="" />
                </div>
              </div>
            </div>

            <div className='cardContainer'>
              <div className='rareUpperCard'>
                <h3>RARE</h3>
                <h5>80+ PLAYER</h5>
                <div id='cardImage'onClick={buyRare} >
                </div>
                <div className='marketCardPrice' onClick={buyRare}>
                  <b>35</b>
                  <img id='marketCoinImage' src={coin} alt="" />
                </div>
              </div>
            </div>

            <div className='cardContainer'>
              <div className='legendUpperCard'>
                <h3>LEGEND</h3>
                <h5>90+ PLAYER</h5>
                <div id='cardImage' onClick={buyLegend}>
                </div>
                <div className='marketCardPrice' onClick={buyLegend}>
                  <b>99</b>
                  <img id='marketCoinImage' src={coin} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Market