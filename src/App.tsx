import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { Main } from './routes'
import './App.scss'
import { useEffect } from 'react';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/' && location.hash === '') {
      navigate('/main', { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route index element={<Navigate to="/main" />} />
      <Route path='/main/:slide?' element={<Main />} />
    </Routes>
  )
}