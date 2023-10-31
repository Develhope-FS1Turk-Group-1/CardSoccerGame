import React from 'react'
import {Link,useNavigate} from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={()=>{
                        navigate('/login');
                    }}>Login</button>
                    <button onClick={()=>{
                        navigate('/register');
                    }}>register</button>
      </div>
  );
}

export default HomePage