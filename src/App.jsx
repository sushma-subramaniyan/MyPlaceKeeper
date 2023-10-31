import { Route, Routes } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Instructions from './components/Instructions';
import  Collections  from './components/Collections';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Instructions" element={<Instructions />} />
      <Route path="/Collections" element={<Collections />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/testpage' element={
        <PrivateRoute>
          <TestPage />
        </PrivateRoute> 
      }/>
      <Route path="*" element={<h1>404 Pagae</h1>} />
    </Routes>
  )
}

export default App;
