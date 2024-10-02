import React, { useContext } from 'react'
import logoimg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
const Header = () => {
    const cartCtx = useContext(CartContext)

    const totalCartItems = cartCtx.items.reduce((totalNumOfItems, item) => {
        return totalNumOfItems + item.quantity
    }, 0)


  return <header id='main-header'>
    <div id='title'>
        <img src={logoimg} alt='Best Restaurant'/>
        <h1> delicious Meal  </h1>

    </div>

    <nav>
        <Button textOnly={true}> Cart ({totalCartItems}) </Button>
    </nav>

    </header>
  
}

export default Header