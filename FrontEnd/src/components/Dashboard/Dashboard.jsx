import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData.user.username);
    } else {
      axios.get('http://localhost:3050/login')
        .then(response => {
        setUser(response.data.user.username);
      })
    }

  }, [])
  console.log(user)



    return (
        <div>
            <h1>Hoşgeldin {user}.</h1>
        </div>
    );
};

export default Dashboard;
