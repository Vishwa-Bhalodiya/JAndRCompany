import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "../services/auth";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = getUser();
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}