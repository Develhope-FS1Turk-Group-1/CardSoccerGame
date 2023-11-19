import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';

const MyContext = createContext();
const cookies = new Cookies();

const UserProvider = ({ children }) => {
  const storedUserData = cookies.get('user');
  const [level, setLevel] = useState(() =>{
	return storedUserData ? storedUserData.level : 0;
  });
  const [money, setMoney] = useState(() =>{
	return storedUserData ? storedUserData.money : 0;
  });
  const [userId, setUserId] = useState(() => {
    return storedUserData ? storedUserData.userId : 0;
  });
  const [energy, setEnergy] = useState(() => {
    return storedUserData ? storedUserData.energy : 0;
  });

  useEffect(() => {
    cookies.set('user', { userId, money, level, energy }, { path: '/' });
  }, [userId, money, level, energy]);

  return (
    <MyContext.Provider
      value={{ level, setLevel, money, setMoney, userId, setUserId, energy, setEnergy }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useUserProvider = () => {
  return useContext(MyContext);
};

export { useUserProvider, UserProvider };
