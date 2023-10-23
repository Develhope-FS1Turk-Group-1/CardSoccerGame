import {useEffect, useState} from 'react';

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
            <h1>Hoşgeldin {user}.</h1>
        </div>
    );
};

export default Dashboard;
