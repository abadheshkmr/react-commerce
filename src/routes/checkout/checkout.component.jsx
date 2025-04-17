/**
 * 
 * 1. you need Route to go to checkout page
 * 2. you need cartItems to display on the page
 * 3. in side checkout page you need to show items total
 * 4. you need on click increase and decrese quantity handler that update item total
 * 
 */

import { useContext } from 'react';
import './checkout.styles.jsx';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles.jsx';


const Checkout = () => {

   const {cartItems, cartTotal, updateCart} = useContext(CartContext);
   console.log('hi')
   const updateShoppingCart = (event) => {
    
    const {quantity} = event.target;
    console.log(quantity)}

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

                {
                    cartItems.map((cartItem)=>{
            
                        return (
                            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                        )
                        
                    })
                }
                <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout;