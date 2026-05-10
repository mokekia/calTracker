import { useState, useEffect } from "react"
function Dashboard() {
  const USER_ID = '69fff9cc747e655c2e850c69'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(0)

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
    fetchStats()
    
    // Show the daily calories with setIntervals and auto-refresh
    const interval = setInterval(() => {
      fetchStats()
    }, 5000)

    return () => clearInterval(interval)
  }, [])



  // 3. Show meal buttons
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error: {error}</h1>
  return (
    <div>
      <p>Calories eaten: {stats.caloriesEaten}</p>
      <p>Daily calorie goal: {stats.dailyCalorieGoal}</p>
      <p>Calories left: {stats.caloriesLeft}</p>
    </div>
  )
}
export default Dashboard