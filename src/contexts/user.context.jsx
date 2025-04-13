import { createContext, use, useEffect, useState } from "react";
import { onAuthStateChangedListiener, signOutUser, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() =>{
       const unsubscribe =  onAuthStateChangedListiener((user) => {
        setCurrentUser(user);
        if (user) {
            createUserDocumentFromAuth(user);
        }
        console.log(user);
       });
       return unsubscribe;
    },[]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

