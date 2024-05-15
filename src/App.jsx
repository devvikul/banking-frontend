import './App.css'
import Home from './components/home/Home'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate= useNavigate()

  const goToManageBeneficiaries = () =>{
    navigate('/managebeneficiaries')
  }
  return (
    <>
      <Home goToManageBeneficiaries={goToManageBeneficiaries}/>
    </>
  )
}

export default App
