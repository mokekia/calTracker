import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MealForm from '../components/MealForm'
function AddMeal() {
  const { mealId } = useParams()
  const [foodEntries, setFoodEntries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFoodEntries = async () => {
      try {
        const result = await fetch(`http://localhost:5000/api/foodentries/${mealId}`)
        const data = await result.json()
        setFoodEntries(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchFoodEntries()
    
    const interval = setInterval(() => {
      fetchFoodEntries()
    }, 5000)

    return () => clearInterval(interval)

  },[])
  
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error: {error}</h1>
  return (
    <div>
      
      <h1>Add Meal</h1>
      <h2>Food Entries</h2>
      {foodEntries.map(entry => (
        <div key={entry._id}>
          <p>{entry.name} - {entry.calculatedCalories} kcal</p>
        </div>
      ))}

      <MealForm mealId={mealId}/>

    </div>
  )
}
export default AddMeal