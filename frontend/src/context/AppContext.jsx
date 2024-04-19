import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        setLoggedIn(false);
        router.push('/authenticate');
    }

    return (
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser,
            loggedIn,
            setLoggedIn,
            logout
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext);

export default useAppContext;