import React, {useState} from 'react';
import '../../../public/css/main.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Fourfour from './components/Fourfour';
import Fourthree from './components/Fourthree';

const Single = () => {

    const [formation, setFormation] = useState('FourFourTwo');
    const [selectedPlayer, setSelectedPlayer] = useState()
    const playerList = ['ahmet', 'mehmet', 'hasan', 'ali'];


    const choosePlayer = (player) => {
        setSelectedPlayer(player)
    }


	return (
		<div>
			<Header />
			<div className='formationContainer'>
				<div className='lineContainer'>
					{formation == 'FourFourTwo' ? (
						<Fourfour
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}
						/>
					) : (
						<Fourthree
							selectedPlayer={selectedPlayer}
							setSelectedPlayer={setSelectedPlayer}
						/>
					)}
				</div>
				<div className='formationBtn'>
					<button onClick={() => setFormation('FourFourTwo')}>
						<span>Type :</span> 4-4-2
					</button>
					<button onClick={() => setFormation('FourThreeThree')}>
						<span>Type :</span> 4-3-3
					</button>
				</div>
				<div className='playerList'>
					{playerList.map((player, index) => (
						<p
							key={index}
							onClick={() => choosePlayer(player)}>
							{player}
						</p>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Single;
