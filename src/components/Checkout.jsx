import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../Utils/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'

const Checkout = () => {

   const cartCxt = useContext(CartContext)
   const userProgCtx = useContext(UserProgressContext)

   const cartTotal = cartCxt.items.reduce((totalPrice, item) => 
    totalPrice + item.quantity * item.price , 0)
   function handleClose() {
    userProgCtx.hideCheckout()
   }

  return (
    <Modal openProps={userProgCtx.progress ==='checkout'} 
    onCloseProps={handleClose}>
        <form>
            <h2> Checkout </h2>
            <p> Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input labelPros=" Full Name" type='text' idProps='full-name'  />
        <Input labelPros=" E-Mail Address" type='email' idProps='email' />
        <Input labelPros=" Street" type='text' idProps='sreet' />

        <div className='control-row'>
          <Input labelPros='Postal code' type='text' idProps='postal-code' />
          <Input labelPros='City' type='text' idProps='city' />
        </div>

        <p className='modal-actions'>
            <Button textOnly type='button' onClick={handleClose} > Close </Button>
            <Button> Place Order </Button>
        </p>

        </form>
    </Modal>
  )
}

export default Checkout