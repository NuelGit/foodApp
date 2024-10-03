import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import {currencyFormatter} from '../Utils/formatting'
import Button from '../components/UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './UI/CartItem'

const Cart = () => {
    const cartCxt = useContext(CartContext)
    const userProgCtx = useContext(UserProgressContext)

    const cartTotal = cartCxt.items.reduce((totalPrice, item) => 
        totalPrice + item.quantity * item.price , 0)
    
    function handleCloseCart () {
        userProgCtx.hideCart()
    }

    function handleGotoCheckout () {
        userProgCtx.showCheckout()
    }

  return (
    <Modal className='cart' 
    openProps={userProgCtx.progress === 'cart' }
     onCloseProps={userProgCtx.progress ==='cart' ? handleCloseCart :null}  >
        <h2> Your Cart </h2>
        <ul>
            { cartCxt.items.map((item) => ( 
                <CartItem key={item.id} 
                name ={item.name}
                quantity={item.quantity}
                price={item.price}
                onIncrease={ () => cartCxt.addItem(item)} 
                onDecrease={ () => cartCxt.removeItem(item.id)} />
            ))}
                 
        </ul>
            <p className='cart-total'> {currencyFormatter.format(cartTotal)} </p>
            <p className='modal-actions'>
                <Button textOnly onClick ={handleCloseCart}>Close</Button>
                {cartCxt.items.length > 0 && (<Button onClick={handleGotoCheckout}> Go to Checkout</Button>) } 
            </p>

    </Modal>
  )
}

export default Cart