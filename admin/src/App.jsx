import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/authentication/Login';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/dashboard/:authId' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App