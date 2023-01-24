import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import NotFound from './pages/404/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Navbar />} >
        <Route path='/l' element={<Login />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={< NotFound />} />
    </Routes>
  );
}

export default App;
