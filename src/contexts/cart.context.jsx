import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () =>{},
    cartCount: 0

});

const addCartItem = (cartItems, prouctToAdd) => {
    // find cartItems contain productToAdd
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === prouctToAdd.id);
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === prouctToAdd.id ?
              {...cartItem, quantity: cartItem.quantity + 1} : cartItem)      
    }
    return [...cartItems, {...prouctToAdd, quantity: 1}];
}


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    
    useEffect(()=> {
        const newCartCount = cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (prouctToAdd) => {
        console.log(prouctToAdd);
        const newCartItems = addCartItem(cartItems, prouctToAdd);
        console.log(newCartItems);
        setCartItems(newCartItems);
    }
    // const noOfItems = (cartItems) => {
    //     return cartItems.reduce((total,cartItem) => total+cartItem.quantity);
    // }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}