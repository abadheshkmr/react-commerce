import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

/*
cartReducer which does all of the operation

define INITIAL STATE

useReducer(cartReducer, initial value)



*/

const CART_ACTION_TYPES ={
    SET_CART_UPDATE: 'CART_UPDATE',
    SET_IS_CART_OPEN: 'IS_CART_OPEN'


}
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


const cartReducer = (state, action) => {

    const {type, payload} = action;
    console.log(payload);
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_UPDATE:
            return {
                ...state,
                ...payload
                
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
            return {
                ...state,
                ...payload
            }    
        default:
            console.log(`unexpected value of ${type}`);
            return state;
    }

}

export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {isCartOpen,cartCount, cartItems, cartTotal} = state;
     const setCartItems = (cartItems) => {
       
        const {totalQuantity, totalPrice} = cartItems.reduce(
            (accumlator, cartItem) => {
                const {quantity, price} = cartItem;
                accumlator.totalPrice += quantity * price;
                accumlator.totalQuantity += quantity;
                return accumlator;
            },
            {totalQuantity: 0, totalPrice:0}
        );
        console.log({totalQuantity, totalPrice});
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_UPDATE,{
                cartItems: cartItems,
                cartCount: totalQuantity,
                cartTotal: totalPrice,
                isCartOpen: isCartOpen
            } )
            )
        }

     useEffect(()=> {
        //const newCartCount = cartItems.reduce((total,cartItem) => total+cartItem.quantity, 0);
        setCartItems(cartItems);
        //setIsCartOpen(isCartOpen);
    }, [cartItems])

    const setIsCartOpen = (bool) => {
        console.log('inside setIsCartOpen')
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {isCartOpen: bool}));
    }

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