import { Navigate, Outlet } from 'react-router'

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem('loggedin')

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return (
        <Outlet />
    )
}