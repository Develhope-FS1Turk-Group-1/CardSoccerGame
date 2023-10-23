import React, {useState} from 'react';
import '../../../public/css/main.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Fourfour from './components/Fourfour';
import Fourthree from './components/Fourthree';

const Single = () => {
	/* const firstFormation = `
  <div
                    id="first"
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

                    className='line'>
                    <div id='player7'></div>
                    <div id='player8'></div>
                    <div id='player9'></div>
                    <div id='player10'></div>
                </div>
  `;

    const secondFormation = `
                <div
                    id='line0'
                    className='line'>
                    <div id='goalKeeper'></div>
                </div>
                <div
                    id='line_1'
                    className='line'>
                    <div id='player1'></div>
                    <div id='player2'></div>
                    <div id='player3'></div>
                </div>
                <div
                    id='line_2'
                    className='line'>
                    <div id='player4'></div>
                    <div id='player5'></div>
                    <div id='player6'></div>
                </div>
                <div
                    id='line_3'
                    className='line'>
                    <div id='player7'></div>
                    <div id='player8'></div>
                    <div id='player9'></div>
                    <div id='player10'></div>
                </div>
  `; */

    const [formation, setFormation] = useState('FourFourTwo');

	// const playerList = [];

	// const handleClick = (form) => {
	//     if (form == firstFormation) {
	//         setFormation(firstFormation);
	//     } else {
	//         setFormation(secondFormation);
	//     }
	// };

	return (
		<div>
			<Header />
			<div className='formationContainer'>
				<div className='lineContainer'>
					{formation == 'FourFourTwo' ? <Fourfour /> : <Fourthree />}
				</div>
				<div className='formationBtn'>
					<button onClick={() => setFormation('FourFourTwo')}>
						<span>Type :</span> 4-4-2
					</button>
					<button onClick={() => setFormation('FourThreeThree')}>
						<span>Type :</span> 4-3-3
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Single;
