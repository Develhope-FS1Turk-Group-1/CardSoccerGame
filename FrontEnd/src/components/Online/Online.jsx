import React, { useState } from "react";
import "./OnlineStyle.css";
import { useUserProvider } from "../../Contexts/UserContext";
import axios from "axios";

const Online = () => {
  const { setMoney, money, setLevel, level, userId, setUserId, energy, setEnergy } = useUserProvider();
  const [opponentId, setOpponentId] = useState()

  const [resultScreen, setResultScreen] = useState("none");
  const [result, setResult] = useState("none");
  const [blur, setBlur] = useState("blur(0px)");
  const [earnedMoney, setEarnedMoney] = useState("10");
  const [showEnergyError, setShowEnergyError] = useState(false);
  const [energyErrorMessage, setEnergyErrorMessage] = useState("");
  
  const updateMoney = () => {
    axios
      .get(`http://localhost:3050/player/getMoney/${userId}`)
      .then((response) => {
        if (response.data) {
          setMoney(response.data.money);
          console.log(response.data.money);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateXP = () => {
    axios
      .get(`http://localhost:3050/player/getXP/${userId}`)
      .then((response) => {
        if (response.data) {
          setLevel(response.data.level);
          console.log(response.data.level);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const checkEnergyAndStartMatch = () => {
    if (energy >= 30) {
      startFriendMatch();
      updateEnergy();
    } else {
      // Show popup error if energy is not sufficient
      setEnergyErrorMessage("Insufficient energy. Need at least 30 energy to start a match!");
      setShowEnergyError(true);
    }
  };

  const startFriendMatch = () => {
    setResultScreen("flex");
    setBlur("blur(10px)");
    console.log(opponentId, userId);
    axios
      .post(`http://localhost:3050/play/playOnline`, {
        username: opponentId,
        userId: userId,
      })
      .then((response) => {
        setResult(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const updateEnergy = async() => {
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

  return (
    <div>
      <div className="onlineAllContainer">
        <div style={{ filter: blur }} className="playContainer">
          <div className="playRandom">
            <button id="PlayRandomButton">PLAY!</button>
          </div>
          <div className='playFriends'>
            <div className='searchContainer'>
              <input onChange={(e) => {
                setOpponentId(e.target.value);
              }} type="text" placeholder='Enter Your Friend Username' />
              <button onClick={() => { checkEnergyAndStartMatch(); updateEnergy(); }} id='PlayFriendButton'>PLAY!</button>
            </div>
          </div>
        </div>

        {showEnergyError && (
          <div className="energyErrorPopup">
            <p>{energyErrorMessage}</p>
            <button
              id="GreenButton"
              onClick={() => {
                setShowEnergyError(false);
              }}
            >
              OK
            </button>
          </div>
        )}

        <div
          className="resultScreen"
          style={{
            display: resultScreen,
            color:
              result.userGoal === result.opponentGoal
                ? "gray"
                : result.userGoal > result.opponentGoal
                ? "green"
                : "red",
          }}
        >
          {result == "" ? (
            "The match is ongoing"
          ) : result.userGoal > result.opponentGoal ? (
            <div id="winAlert">
              <div>
                <h1>
                  {result.userGoal} - {result.opponentGoal}
                </h1>
                <h1>YOU WON!</h1>
                <p>Money Earned: 10$ </p>
                <p>XP Earned:150</p>
                <button
                  id="GreenButton"
                  onClick={() => {
                    setResult("");
                    setResultScreen("none");
                    setBlur("blur(0px)");
                    updateMoney();
                    updateXP();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          ) : result.userGoal < result.opponentGoal ? (
            <div id="lostAlert">
              <div>
                <h1>
                  {result.userGoal} - {result.opponentGoal}
                </h1>
                <h1>YOU LOST!</h1>
                <p>Money Earned: 3$ </p>
                <p>XP Earned:30</p>
                <button
                  id="GreenButton"
                  onClick={() => {
                    setResult("");
                    setResultScreen("none");
                    setBlur("blur(0px)");
                    updateMoney();
                    updateXP();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div id="drawAlert">
              <div>
                <h1>
                  {result.userGoal} - {result.opponentGoal}
                </h1>
                <h1>IT'S A DRAW!</h1>
                <p>Money Earned: 5$ </p>
                <p>XP Earned:75</p>
                <button
                  id="GreenButton"
                  onClick={() => {
                    setResult("");
                    setResultScreen("none");
                    setBlur("blur(0px)");
                    updateMoney();
                    updateXP();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Online;
