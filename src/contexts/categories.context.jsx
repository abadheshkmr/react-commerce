import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState([]);

    // useEffect(() => {
    //     addCollectionAndDocuments('category', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
           const categoryMap = await getCategoriesAndDocuments ();
           //console.log( categoryMap);
           setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, []);
    
    const value = {categoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}


/*
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
    */