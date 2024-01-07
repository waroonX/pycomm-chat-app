import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        };
    });

    return (
        <ChatContext.Provider value={{ currentUser }}>
            {children}
        </ChatContext.Provider>
    );
};
