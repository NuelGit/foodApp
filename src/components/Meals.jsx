import React, { useState, useEffect} from 'react'
import MealItems from './MealItems'

const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([])

    useEffect(() => {
        async function fetchMeals () {
            const reply = await fetch('http://localhost:3000/meals')
    
            if ( ! reply.ok){
                // ....
            }

            const repMeals = await reply.json()
            setLoadedMeals(repMeals)
        }
    
        fetchMeals()
    }, [])

   


  return (
    <ul id='meals'> {loadedMeals.map((meal) => 
    (<MealItems key={meal.id} meals={meal} />
    ))}
    </ul>
  )
}

export default Meals