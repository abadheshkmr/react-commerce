/**
 * 
 * 1. you need Route to go to checkout page
 * 2. you need cartItems to display on the page
 * 3. in side checkout page you need to show items total
 * 4. you need on click increase and decrese quantity handler that update item total
 * 
 */

import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';


const Checkout = () => {

   const {cartItems, cartTotal, updateCart} = useContext(CartContext);
    return (
        <div className='checkout-container'>
            <div className='checkout-cart-items'>
             {
                cartItems.map(cartItem => {
                    const {name, imageUrl, price, quantity} = cartItem;
                    return (
                       <div key={cartItem.id}> 
                        <img src={imageUrl} alt={`${name}`} />
                        <span>{name}</span>
                        <button onClick={() => updateCart(cartItem, -1)}>{'>'}</button>
                        <span>
                        {quantity}
                        </span>
                        <button onClick={() => updateCart(cartItem, 1)}>{'>'}</button>
                        <button onClick={() => updateCart(cartItem, 0)}>Remove</button>
                        <div>{cartTotal}</div>
                       </div>
                    )})
             }
            </div>
        </div>
    )
}

export default Checkout;