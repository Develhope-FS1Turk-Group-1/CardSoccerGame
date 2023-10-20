import React, {useState} from 'react';
import '../../../public/css/main.css';



const Single = () => {

    const firstFormation = `
  <div

                    className='line'>
                    <div id='goalKeeper'></div>
                </div>
     <div

                    className='line'>
                    <div id='player1'></div>
                    <div id='player2'></div>
                </div>
                <div

                    className='line'>
                    <div id='player3'></div>
                    <div id='player4'></div>
                    <div id='player5'></div>
                    <div id='player6'></div>
                </div>
                <div

                    className='aline'>
                    <div id='player7'></div>
                    <div id='player8'></div>
                    <div id='player9'></div>
                    <div id='player10'></div>
                </div>
  `;

    const secondFormation = `
                <div
                    id='line0'
                    className='aline'>
                    <div id='goalKeeper'></div>
                </div>
                <div
                    id='line_1'
                    className='aline'>
                    <div id='player1'></div>
                    <div id='player2'></div>
                    <div id='player3'></div>
                </div>
                <div
                    id='line_2'
                    className='aline'>
                    <div id='player4'></div>
                    <div id='player5'></div>
                    <div id='player6'></div>
                </div>
                <div
                    id='line_3'
                    className='aline'>
                    <div id='player7'></div>
                    <div id='player8'></div>
                    <div id='player9'></div>
                    <div id='player10'></div>
                </div>
  `;

  const [formation, setFormation] = useState(firstFormation);
  const [player, setPlayer] = useState();


  const playerList = [];

  const handleClick = (form) => {
    if (form == firstFormation) {
        setFormation(firstFormation);
    } else {
        setFormation(secondFormation);
    }
  }

    return (
        <div className='formationContainer'>
            <div
                className='lineContainer'
                dangerouslySetInnerHTML={{__html: formation}}>
            </div>
            <div className='formationBtn'>
                <button onClick={() => handleClick(firstFormation)}>
                    <span>Type :</span> 4-4-2
                </button>
                <button onClick={() => handleClick(secondFormation)}>
                    <span>Type :</span> 4-3-3
                </button>
            </div>
        </div>
    );
};

export default Single;
