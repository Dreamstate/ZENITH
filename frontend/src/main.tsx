import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Homepage from './pages/Homepage.tsx'
import AuthRequired from './components/AuthRequired.tsx'
import Login from './pages/Login.tsx'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route element={<AuthRequired />}>
              <Route index element={<Homepage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
