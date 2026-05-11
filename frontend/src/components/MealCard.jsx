function MealCard({ mealType, totalCalories, onClick }) {
  return (
    <div>
      <p>{mealType}</p>
      <p>{totalCalories}</p>
      <button onClick={onClick}>Add food</button>
    </div>
  )
}
export default MealCard