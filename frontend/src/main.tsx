import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Homepage from './pages/Homepage'
import AuthRequired from './components/AuthRequired'
import Login from './pages/Login'
import Layout from './components/Layout'
import Callback from './pages/Callback'
import './index.css'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="auth/callback" element={<Callback />} />
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
