import { useEffect, useState } from 'react';
import './DashboardStyle.css'
import tactics from "../../../Assets/Dashboard/tactics.jpg"
import playnow from "../../../Assets/Dashboard/playnow.jpg"
import online from "../../../images/bellingham.jpeg"
import market from "../../../Assets/Dashboard/market.jpg"
import Teamselect from '../TeamSelect/Teamselect';
import { useUserProvider } from '../../Contexts/UserContext';
import {Link,useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
	const{setMoney,money,setLevel,level,userId,setUserId} = useUserProvider();

  useEffect(() => {
    if(userId == 0){
      navigate("/login");
    }
    /*const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData.user.username);
    }*/



  }, [])
  console.log(user)
  return (
    <div>
      <div className="DashboardBackground">
        <div className="Dashboarddiv">
          <div className="tacticsDiv" onClick={()=>{
            navigate('/formation')
          }}>
            <h1>Tactics</h1>
            <span><h1>Formation</h1></span>
            <img src={tactics} alt="" />
          </div>
          <div className="playDiv">
            <h1>Play</h1>
            <span><h1>Single</h1></span>
            <img src={playnow} alt="" onClick={()=>{
              navigate('/single');
            }}/>
          </div>
          <div id="onlineDiv" className="playDiv">
            <h1>Play</h1>
            <span><h1>Online</h1></span>
            <img src={online} alt="" onClick={()=>{
              navigate('/online');
            }}/>
          </div>
          <div className="marketDiv" onClick={()=>{
            navigate('/market');
          }}>
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
