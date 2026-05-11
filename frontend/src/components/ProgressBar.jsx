import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function ProgressBar({ caloriesEaten = 0, dailyCalorieGoal = 0, caloriesLeft = 0 }) {
  const percentage = (caloriesEaten / dailyCalorieGoal) * 100
  return (
    <div style={{width: '200px', margin: '0 auto'}}>
      <CircularProgressbar 
        value={percentage || 0}
        text={`${caloriesLeft} kcal` || 0}
        styles={buildStyles({
          textSize:'12px'
        })}
     />
    </div>
    
  )
}
export default ProgressBar