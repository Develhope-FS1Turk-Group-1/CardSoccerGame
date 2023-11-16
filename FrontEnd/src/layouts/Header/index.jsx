import { useEffect, useState } from "react";
import "./header.css";
import coinImage from "../../assets/coin.png";
import soccerBallImage from "../../assets/soccerBallImage.png";
import logOutIcon from "../../assets/logOutIcon.png";
import { UserProvider, useUserProvider } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const {
    setMoney,
    money,
    setLevel,
    level,
    userId,
    setUserId,
    energy,
    setEnergy,
  } = useUserProvider();

  const getColorClass = () => {
    if (energy > 70) {
      return "green";
    } else if (energy > 40) {
      return "yellow";
    } else {
      return "red";
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="headerAllContainer">
        <div className="headerSmallContainer">
          <div className="leftSide">
            <div className="levelContainer">
              <h3>Level:{Math.floor(level / 1000)}</h3>
            </div>

            <div className='rightSide'>
              <h3>XP:{Math.floor(level % 1000)}/1000</h3>
            </div>



            <div className="moneyContainer">
              <img id="headerCoinImage" src={coinImage} alt="" />
              <div className="moneyValue">{money}</div>
            </div>
            <div className={`energyContainer ${getColorClass()}`}>
              <h3>Energy:{energy}/100</h3>
            </div>
          </div>
          <div
            className="rightSide"
            onClick={() => {
              console.log("Log Out");
              setUserId(0);
              navigate("/login");
            }}
          >
            <img id="soccerImage" src={soccerBallImage} alt="" />
            Log Out
            <img id="headerLogOutImage" src={logOutIcon} alt="" />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Header;
