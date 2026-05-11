import { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL
function MealForm({ mealId }) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [kcalPer100g, setKcalPer100g] = useState('')
  
  const handleSubmit = async () => {
    try {
      const result = await fetch(`${API_URL}/api/foodentries/${mealId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          weight: weight,
          kcalPer100g: kcalPer100g,
          mealId: mealId
        })
      })
      const data = await result.json()
      setName('')
      setWeight('')
      setKcalPer100g('')
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <form>
      <input className='input' type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
      <input className='input' type="number" placeholder='weight (g)' value={weight} onChange={(e) => setWeight(e.target.value)}/>
      <input className='input' type="number" placeholder='Kcal per 100g' value={kcalPer100g} onChange={(e) => setKcalPer100g(e.target.value)}/>
      <button className="btn" onClick={() => handleSubmit()}>Add</button>
    </form>
  )
}
export default MealForm