import PlayerCards from "./PlayerCards";

const Fourthree = () => {
    return (
        <div>
            <div className='forward'>
                <PlayerCards />
                <PlayerCards />
                <PlayerCards />
            </div>
            <div className='midField'>
                <PlayerCards />
                <PlayerCards />
                <PlayerCards />
            </div>
            <div className='defence'>
                <PlayerCards />
                <PlayerCards />
                <PlayerCards />
                <PlayerCards />
            </div>
            <div className='goalKeeper'>
                <PlayerCards />
            </div>
        </div>
    );
};

export default Fourthree;
