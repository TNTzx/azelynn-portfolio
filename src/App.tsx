import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Main } from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/main" />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}