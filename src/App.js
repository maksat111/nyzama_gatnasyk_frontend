import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import NotFound from './pages/404/NotFound';
import Gatnasyk from './pages/Gatnasyk/Gatnasyk';
import Dashboard from './pages/Dashboard/Dashboard';
import Hasabat from './pages/Hasabat/Hasabat';

function App() {
  return (
    <Routes>
      <Route element={<Navbar />} >
        <Route path='/gatnasyk' element={<Gatnasyk />} />
        <Route path='/hasabat' element={<Hasabat />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='/' element={<Login />} />
      <Route path='*' element={< NotFound />} />
    </Routes>
  );
}

export default App;
