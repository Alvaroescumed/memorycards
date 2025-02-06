import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainMenu from './pages/MainMenu'
import NewGame from './pages/NewGame'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainMenu/>}/>
          <Route path='/game' element={<NewGame/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App