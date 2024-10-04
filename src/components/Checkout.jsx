import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../Utils/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import useHttp from '../hooks/useHttp'
import Error from './Error'


const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json'

  },
  
}

const Checkout = () => {



   const cartCxt = useContext(CartContext)
   const userProgCtx = useContext(UserProgressContext)
  const {data, 
    error, 
    isLoading: isSending, 
    sendNewReq} = useHttp('http://localhost:3000/orders', requestConfig)

   const cartTotal = cartCxt.items.reduce((totalPrice, item) => 
    totalPrice + item.quantity * item.price , 0)


   function handleClose() {
    userProgCtx.hideCheckout()
   }

   function handleFinish () {
    userProgCtx.hideCheckout()
    cartCxt.clearCart()
   }

   function handleSubmit (e) {
    e.preventDefault()

    const foData = new FormData(e.target)
    const customerData = Object.fromEntries(foData.entries())

    sendNewReq(
      JSON.stringify({
      order:{
        items: cartCxt.items,
        customer: customerData
      }
    
    })
  )

  
}

let actions = (
  <>
  <p className='modal-actions'>
          <Button textOnly type='button' onClick={handleClose} > Close </Button>
          <Button> Place Order </Button>
      </p>
  </>
)  

if( isSending){
  actions= <span> Sending Order .... </span>
}
  
if( data && !error ){
  return <Modal openProps={userProgCtx.progress ==='checkout'} onClose={handleFinish} >
    <h2> Success!</h2>
    <p> Your order was submitted successfully, Please place another Order..</p>
    <p> We will reach out to you shortly via email within the next few minutes.</p>
         
         <p className='modal-actions'> 
          <Button onClick={handleFinish}> okay </Button>

         </p>

  </Modal>
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

            { error && <Error title='Failed to Submit your Orders' message={error} /> }
             <p className='modal-actions'> {actions} </p>


        </form>
    </Modal>
  )
}

export default Checkout


// fetch('http://localhost:3000/orders', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     order:{
//       items: cartCxt.items,
//       customer: customerData
//     }
//   })
// })