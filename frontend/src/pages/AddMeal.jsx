import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MealForm from '../components/MealForm'
function AddMeal() {
  const { mealId } = useParams()
  const [foodEntries, setFoodEntries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
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
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?')
    if(confirmed){
      const result = await fetch(`http://localhost:5000/api/foodentries/${id}`,{
      method: 'DELETE'    
    })
    setFoodEntries(prev => prev.filter(entry => entry._id !== id))
    }
    
    

  }
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error: {error}</h1>
  return (
    <div>
      
      <h1>Add Meal</h1>
      <h2>Food Entries</h2>
      <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}/>      
      {foodEntries.filter(entry => entry.name.toLowerCase().includes(search.toLowerCase())).map(entry => 
        <div key={entry._id}>
          <p>{entry.name} - {entry.calculatedCalories} kcal</p> <button onClick={() => handleDelete(entry._id)}>Delete</button>
        </div>
      )}
      
      <MealForm mealId={mealId}/>

      <button onClick={() => navigate('/')}>Back to dashboard</button>
    </div>
  )
}
export default AddMeal