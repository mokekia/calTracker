import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddMeal from './pages/AddMeal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/meal/:mealId" element={<AddMeal />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App