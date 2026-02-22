import { Navigate, Route, Routes } from 'react-router'
import { Main } from './routes'
import './App.scss'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path='/main/:slide?' element={<Main />} />
    </Routes>
  )
}