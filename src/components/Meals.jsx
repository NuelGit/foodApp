import useHttp from '../hooks/useHttp'
import Error from './Error'
import MealItems from './MealItems'

const requestConfig = {}

const Meals = () => {

  const {data: loadedMeals,
     isLoading, 
     error} = useHttp('http://localhost:3000/meals', requestConfig, [])

    if( isLoading){
        return <p className='center'> Fetch delicious meal for you ... </p>
   }

   if(error){
        return <Error title="No Meal Fetched !" message={error} />

   }
  
  return (
    <ul id='meals'> {loadedMeals.map((meal) => 
      (<MealItems key={meal.id} meals={meal} />
      ))}
    </ul>
  )
}


// const [loadedMeals, setLoadedMeals] = useState([])

// useEffect(() => {
//     async function fetchMeals () {
//         const reply = await fetch('http://localhost:3000/meals')

//         if ( ! reply.ok){
//             // ....
//         }

//         const repMeals = await reply.json()
//         setLoadedMeals(repMeals)
//     }

//     fetchMeals()
// }, [])
export default Meals