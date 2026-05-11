import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function ProgressBar({ caloriesEaten, dailyCalorieGoal, caloriesLeft }) {
  const percentage = (caloriesEaten / dailyCalorieGoal) * 100
  return (
    <div style={{width: '200px', margin: '0 auto'}}>
      <CircularProgressbar 
        value={percentage}
        text={caloriesLeft + 'kcal'}
     />
    </div>
    
  )
}
export default ProgressBar