import React, { useContext } from 'react'
import {currencyFormatter } from '../Utils/formatting'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

const MealItems = ({meals}) => {

  const cartCtx = useContext(CartContext)
  
  function handleAddMealtocart () {
    cartCtx.addItem(meals)
  }


  return (
    <li className ='meal-item'>
       <article>
        <img src={`http://localhost:3000/${meals.image}`} alt={meals.name} />
        <div>
            <h3> { meals.name} </h3>
            <p className='meal-item-price'> { currencyFormatter.format(meals.price)} </p>
            <p className='meal-item-description'> { meals.description} </p>
        </div>
        <p className='meal-item-actions'>
            <Button onClick={handleAddMealtocart} > Add to Cart </Button>
        </p>

       </article>
    
    
    
    
    
    </li>
  )
}

export default MealItems