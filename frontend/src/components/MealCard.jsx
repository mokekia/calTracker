function MealCard({ mealType, totalCalories, onClick }) {
  return (
    <div className="meal-card">
      <p>{mealType}</p>
      <p>{totalCalories}</p>
      <button className="btn" onClick={onClick}>Add food</button>
    </div>
  )
}
export default MealCard