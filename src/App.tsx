import { HashRouter, Navigate, Route, Routes } from 'react-router'
import { Main } from './routes'
import './App.scss'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Navigate to="/main" />} />
        <Route path='/main/:slide?' element={<Main />} />
      </Routes>
    </HashRouter>
  )
}