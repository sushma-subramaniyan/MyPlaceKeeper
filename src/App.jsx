import { Route, Routes } from 'react-router';
import './app.css';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="*" element={<h1>404 Pagae</h1>} />
    </Routes>
  )
}

export default App;
