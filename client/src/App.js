
import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/login'
import Compte from './pages/compte'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/compte" element={<Compte />}/>
    </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
