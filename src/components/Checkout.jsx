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
   function handleSubmit (e) {
    e.preventDefault()

    const foData = new FormData(e.target)
    const customerData = Object.fromEntries(foData.entries())

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        order:{
          items: cartCxt.items,
          customer: customerData
        }
      })
    })

   }

  return (
    <Modal openProps={userProgCtx.progress ==='checkout'} 
    onCloseProps={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2> Checkout </h2>
            <p> Total Amount: {currencyFormatter.format(cartTotal)} </p>

        <Input labelPros=" Full Name" type='text' idProps='name'  />
        <Input labelPros=" E-Mail Address" type='email' idProps='email' />
        <Input labelPros=" Street" type='text' idProps='street' />

        <div className='control-row'>
          <Input labelPros='Postal code' type='text' idProps='postal-code' />
          <Input labelPros='City' type='text' idProps='city' />
          <Input labelPros='Phone-Number' type='number' idProps='phone' />
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