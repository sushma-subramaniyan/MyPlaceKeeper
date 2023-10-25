import { Route, Routes } from 'react-router';
import './app.css';
import HomePage from './pages/HomePage';
import Register from './components/Register';
import Login from './components/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<h1>404 Pagae</h1>} />
    </Routes>
  )
}

export default App;
