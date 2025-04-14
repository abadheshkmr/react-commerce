import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
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