import React, { createContext } from 'react';
import { useImmer } from 'use-immer';

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
	const [menuDate, setMenuData] = useImmer({
		genre: [],
		sort: [],
		order: [],
  })
	
	return (
		<MenuContext.Provider value={[menuDate, setMenuData]}>
			{children}
		</MenuContext.Provider>
	)
}

export { MenuContext, MenuContextProvider };