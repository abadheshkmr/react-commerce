import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () =>{},
    cartCount: 0,
    updateCart: () => {},
    cartTotal: 0,
    removeItemToCart: () => {},
    clearItemFromCart: () => {}
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

const updateQty = (cartItems, itemToUpdate, qty) => {
    const existingCartItem = cartItems.find((cartItem => cartItem.id ===itemToUpdate.id ));
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === itemToUpdate.id ? 
        {...cartItem, quantity: cartItem.quantity + qty} : cartItem)
    }
    
}
const removeCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === itemToRemove.id);
    
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !==existingCartItem.id)
    }
    return cartItems.map((cartItem) => cartItem.id === itemToRemove.id ?
    {...cartItem, quantity: cartItem.quantity - 1} : cartItem)      

}

 const clearCartItem =(cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !==cartItemToClear.id)
 }   



export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(()=> {
        const newCartCount = cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(()=> {
        const newCartTotal = cartItems.reduce((total,cartItem) => total+cartItem.price * cartItem.quantity, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])


    // useEffect(()=> {
    //     //const newCartCount = cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0);
    //     const {totalQuantity, totalPrice} = cartItems.reduce(
    //         (accumlator, cartItem) => {
    //             const {quantity, price} = cartItem;
    //             accumlator.totalPrice += quantity * price;
    //             accumlator.totalQuantity += quantity;
    //             return accumlator;
    //         },
    //         {totalQuantity: 0, totalPrice:0}
    //     );
    //     setCartCount(totalQuantity);
    //     setCartTotal(totalPrice);
    // }, [cartItems]



    const addItemToCart = (prouctToAdd) => {
        console.log(prouctToAdd);
        const newCartItems = addCartItem(cartItems, prouctToAdd);
        console.log(newCartItems);
        setCartItems(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        setCartItems(newCartItems);
    }

    const clearItemFromCart = (cartItemToRemove) => {
        console.log( cartItemToRemove )
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        setCartItems(newCartItems);
    }

    const updateCart = (itemToUpdate, qty) => {
        if (qty === NaN) return;
        console.log({...itemToUpdate})
        console.log(qty)
        const newCartItems = qty === 0 ? removeCartItem(cartItems, itemToUpdate) : updateQty(cartItems, itemToUpdate, qty );
        setCartItems(newCartItems);
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, cartTotal, updateCart, removeItemToCart, clearItemFromCart}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}