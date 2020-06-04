import React, { createContext } from "react";
import { useImmer } from "use-immer";

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
	const [notifications, addNotification] = useImmer([]);
	
   return (
	  <NotificationsContext.Provider value={[notifications, addNotification]}>
		{children}
	  </NotificationsContext.Provider>
	);
};

export { NotificationsContext, NotificationsProvider };