import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard/:authId' element={<Dashboard />} />
          <Route path='/products/:authId' element={<Products />} />
        </Routes>
      </Router>
    </>
  )
}

export default App