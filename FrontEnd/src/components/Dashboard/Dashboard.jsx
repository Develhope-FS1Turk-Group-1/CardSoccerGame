import { useEffect, useState } from 'react';
import './DashboardStyle.css'
import tactics from "../../../Assets/Dashboard/tactics.jpg"
import playnow from "../../../Assets/Dashboard/playnow.jpg"
import market from "../../../Assets/Dashboard/market.jpg"
const Dashboard = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData.user.username);
    }

  }, [])
  console.log(user)
  return (
    <div>
      <div className="DashboardBackground">
        <div className="Dashboarddiv">
          <div className="tacticsDiv">
            <h1>Tactics</h1>
            <span><h1>Formation</h1></span>
            <img src={tactics} alt="" />
          </div>
          <div className="playDiv">
            <h1>Play</h1>
            <span><h1>Now</h1></span>
            <img src={playnow} alt="" />
          </div>
          <div className="marketDiv">
            <h1>Card</h1>
            <span><h1>Market</h1></span>
            <img src={market} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
