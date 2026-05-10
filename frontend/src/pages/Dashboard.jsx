import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
function Dashboard() {
  const USER_ID = '69fff9cc747e655c2e850c69'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(0)
  const [meals, setMeals] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    // Get user from backend
      const fetchStats = async () => {
        try {
          const result = await fetch(`http://localhost:5000/api/stats/${USER_ID}/calories-today`)
          const data = await result.json()
          setStats(data)
          setLoading(false)  
        } catch (error) {
          setError(error.message)
          setLoading(false)
        }
    }
      const fetchMeals = async () => {
        try {
          const result = await fetch(`http://localhost:5000/api/meals/${USER_ID}`)
          const data = await result.json()
          setMeals(data)
          setLoading(false)  
        } catch (error) {
          setError(error.message)
          setLoading(false)
        }
        
      }  
    fetchStats()
    fetchMeals()
    
    // Show the daily calories with setIntervals and auto-refresh
    const interval = setInterval(() => {
      fetchStats()
    }, 5000)

    return () => clearInterval(interval)
  }, [])


  const handleMealClick = async (mealType) => {
    const existing = meals.find(meal => meal.mealType === mealType)
    if(existing) {
      navigate(`/meal/${existing._id}`)
    }else{
      try {
        const result = await fetch(`http://localhost:5000/api/meals/${USER_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mealType: mealType,
            date: new Date(),
            totalCalories: 0
          })
        })
        const data = await result.json()
        navigate(`/meal/${data._id}`)
      } catch (error) {
        setError(error.message)
      }
    }
  }

  // Show meal buttons
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error: {error}</h1>
  return (
    <div>
      <p>Calories eaten: {stats.caloriesEaten}</p>
      <p>Daily calorie goal: {stats.dailyCalorieGoal}</p>
      <p>Calories left: {stats.caloriesLeft}</p>
      
      <div>
        <button onClick={() => handleMealClick('breakfast')}>Breakfast</button>
        <button onClick={() => handleMealClick('lunch')}>Lunch</button>
        <button onClick={() => handleMealClick('dinner')}>Dinner</button>
        <button onClick={() => handleMealClick('snacks')}>Snacks</button>
      </div>
    </div>
  )
}
export default Dashboard