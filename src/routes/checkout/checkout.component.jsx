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
import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const Checkout = () => {

   const {cartItems, cartTotal, updateCart} = useContext(CartContext);
   console.log('hi')
   const updateShoppingCart = (event) => {
    
    const {quantity} = event.target;
    console.log(quantity)}

    return (
        <div className='checkout-container'>
            <div  className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>

                {
                    cartItems.map((cartItem)=>{
            
                        return (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                        )
                        
                    })
                }
                <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}

export default Checkout;