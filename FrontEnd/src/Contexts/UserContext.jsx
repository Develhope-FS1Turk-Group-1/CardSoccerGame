import React, { useState, createContext, useContext } from 'react';

const MyContext = createContext();

const UserProvider = ({ children }) => {
	const [level, setLevel] = useState(0);
	const [money, setMoney] = useState(0);
	const [userId, setUserId ] = useState(0);
	const [energy, setEnergy] = useState(0);


	return (
		<MyContext.Provider
			value={{ level, setLevel, money, setMoney, userId, setUserId, energy, setEnergy }}>
			{children}
		</MyContext.Provider>
	);
};
const useUserProvider = () => {
	return useContext(MyContext);
};

export { useUserProvider, UserProvider };
