import React, { useState, useEffect } from 'react'
import '../../../public/css/main.css';
import casual from '../../../Assets/Market/casual.jpg';
import rare from '../../../Assets/Market/rare.jpg';
import legend from '../../../Assets/Market/legend.jpg';
import coin from '../../../Assets/Market/coin.png';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useUserProvider } from '../../Contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import LeftArrowBlue from "../../../Assets/TeamSelect/LeftArrowBlue.svg";
import RightArrowBlue from "../../../Assets/TeamSelect/RightArrowBlue.svg";
import LeftArrow from "../../../Assets/TeamSelect/Vector 14.svg";
import RightArrow from "../../../Assets/TeamSelect/Vector 17.svg";
import axios from 'axios';
const Market = () => {
  const { setMoney, money, setLevel, level, userId, setUserId } = useUserProvider();

  const [bought, setBought] = useState([])
  const [boughtPlayers, setBoughtPlayers] = useState([]);
  const [buyPopUp, setBuyPopUp] = useState('popUpOff');
  const [errorPopUp, setErrorPopUp] = useState('errorPopUpOff');
  const [blur, setBlur] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (userId == 0) {
      navigate("/login");
    }
  }, []);

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
      console.log(response);
      setBoughtPlayers(response.data);
      return response.data;
    } catch (error) {
      console.error('Error buying player:', error);
      throw error;
    }
  };

  const buyCasual = () => {
    if (money < 10) {
      setErrorPopUp('errorPopUpOn');
      return;
    }
    buyPlayer(1, userId);
    setBuyPopUp('popUpOn');
    setBlur('blurOn');
    setMoney(money - 10);
  }
  const buyRare = () => {
    if (money < 35) {
      setErrorPopUp('errorPopUpOn');
      return;
    }
    buyPlayer(2, userId);
    setBuyPopUp('popUpOn');
    setBlur('blurOn');

    setMoney(money - 35);
  }
  const buyLegend = () => {
    if (money < 70) {
      setErrorPopUp('errorPopUpOn');
      setBlur('blurOn');
      return;
    }
    buyPlayer(3, userId);
    setBuyPopUp('popUpOn');
    setMoney(money - 70);
  }

  const buyOther = () => {
console.log("buyother run")
  }

  const cardOptions = [
    {
      title: 'CASUAL',
      title2: "40 - 99 PLAYER",
      className: "casualUpperCard",
      price: 10,
      onClick: buyCasual
    },
    {
      title: 'RARE',
      title2: "65 - 99 PLAYER",
      className: "rareUpperCard",
      price: 35,
      onClick: buyRare
    },
    {
      title: 'LEGEND',
      title2: "75 - 99 PLAYER",
      className: "legendUpperCard",
      price: 70,
      onClick: buyLegend
    },
    {
      title: '---',
      title2: "---",
      className: "casualUpperCard",
      price: 10,
      onClick: buyOther
    },
    {
      title: '---',
      title2: "---",
      className: "casualUpperCard",
      price: 10,
      onClick: buyOther
    },
  ]

  const swiper = useRef(null);
  const goNext = () => {
    if (swiper.current && swiper.current.swiper) {
      swiper.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiper.current && swiper.current.swiper) {
      swiper.current.swiper.slidePrev();
    }
  };
  const [currentSlide, setCurrentSlide] = useState(0);


  return (
    <div className='soccerMarket'>
      <Header />
      <div className={errorPopUp}>
        <h1>Not Enough Money...</h1>
        <button className='button-9' onClick={() => { setBlur(''); setErrorPopUp('errorPopUpOff') }}>OK..</button>
      </div>
      <div className={buyPopUp}>
        <div className='boughtPlayersPopUp'>
          {boughtPlayers.length == 0 ? <h1>LOADING...</h1> : boughtPlayers.map((index, player) => (
            <div key={player.id} className='playerBought'>
              {
                <Card
                  id={player + 1}
                  playersOnBoard={boughtPlayers}
                />}
            </div>
          ))}
        </div>
        <button className='button-9' onClick={() => { setBlur(''); setBuyPopUp('popUpOff'); setBoughtPlayers([]) }}>CLAIM</button>
      </div>

      <div className='marketAllContainer' id={blur}>
        <div className='marketSmallContainer'>
          <h1>CARD MARKET</h1>






          <div className="marketCardContainer">
            <button
              aria-label="Previous"
              onClick={() => {
                if (currentSlide > 0) {
                  setCurrentSlide(currentSlide - 1);
                  goPrev();
                  console.log(currentSlide - 1);
                }
              }}
              className="prev-button"
            >
              <img
                src={currentSlide == !1 ? LeftArrow : LeftArrowBlue}
                alt="Sol Ok"
                width={100}
                height={100}
              />
            </button>
            <Swiper id='cardSwiper' ref={swiper} slidesPerView="3" spaceBetween="10px">
              {cardOptions.map((card, index) => (
                <SwiperSlide key={index} value={card}>
                  <div className={card.className}>
                    <h3>{card.title}</h3>
                    <h5>{card.title2}</h5>
                    <div id='cardImage' onClick={card.onClick}>
                    </div>
                    <div className='marketCardPrice' onClick={card.onClick}>
                      <b>{card.price}</b>
                      <img id='marketCoinImage' src={coin} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              aria-label="Next"
              onClick={() => {
                if (currentSlide < cardOptions.length - 1) {
                  setCurrentSlide(currentSlide + 1);
                  goNext();
                  console.log(currentSlide + 1);
                }
              }}
              className="next-button"
            >
              <img
                src={
                  currentSlide == cardOptions.length - 1
                    ? RightArrow
                    : RightArrowBlue
                }
                alt="Sag Ok"
                width={100}
                height={100}
              />
            </button>
          </div>




          {/* <div className='marketCardContainer'>
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
                <div id='cardImage' onClick={buyRare} >
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
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Market