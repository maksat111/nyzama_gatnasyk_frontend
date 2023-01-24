import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';

function App() {
  return (
    <Routes>

      <Route path='/login' element={<Login />} />
      <Route path='*' element={ } />
    </Routes>
  );
}

export default App;
