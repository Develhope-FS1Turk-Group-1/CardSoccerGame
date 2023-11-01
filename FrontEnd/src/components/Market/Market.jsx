import React, { useState,useEffect } from 'react'
import '../../../public/css/main.css';
import casual from '../../../Assets/Market/casual.jpg';
import rare from '../../../Assets/Market/rare.jpg';
import legend from '../../../Assets/Market/legend.jpg';
import coin from '../../../Assets/Market/coin.png';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useUserProvider } from '../../Contexts/UserContext';
import {Link,useNavigate} from 'react-router-dom';

import axios from 'axios';


const Market = () => {
	const{setMoney,money,setLevel,level,userId,setUserId} = useUserProvider();

  const [bought, setBought] = useState([])

  const navigate = useNavigate();

  useEffect(()=>{
    if(userId == 0){
      navigate("/login");
  }},[]);

  const casualPlayers = [
  ]
  const rarePlayers = [
  ]
  const legendPlayers = [
  ]

  const buyPlayer = async (type, userId) => {
    try {
      const response = await axios.get(`http://localhost:3050/player/buyPlayer`, {
        params: { type, userId }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error buying player:', error);
      throw error;
    }
  };

  const buyCasual = () => {
    if(money < 10){
      alert("You need money");
      return;
    }
    buyPlayer(1,userId);
    setMoney(money-10);
  }
  const buyRare = () => {
    if(money < 35){
      alert("You need money");
      return;
    }
    buyPlayer(2,userId);
    setMoney(money-35);
  }
  const buyLegend = () => {
    if(money < 70){
      alert("You need money");
      return;
    }
    buyPlayer(3,userId);
    setMoney(money-70);
  }

  return (
    <div className='soccerMarket'>
      <Header />
      <div className='marketAllContainer'>
        <div className='marketSmallContainer'>
          <h1>CARD MARKET</h1>
          <div className='marketCardContainer'>
            <div className='cardContainer'>
              <div className='casualUpperCard'>
                <h3>CASUAL</h3>
                <h5>40 - 99 PLAYER</h5>
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
                <h5>65 - 99 PLAYER</h5>
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
                <h5>75 - 99 PLAYER</h5>
                <div id='cardImage' onClick={buyLegend}>
                </div>
                <div className='marketCardPrice' onClick={buyLegend}>
                  <b>70</b>
                  <img id='marketCoinImage' src={coin} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Market