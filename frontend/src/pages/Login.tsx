import { useNavigate } from "react-router"

export default function Login() {
    const navigate = useNavigate()
    return (
    <>
      <h1>Login</h1>
      <button onClick={() => {
        localStorage.setItem('loggedin', 'true')
        navigate('/')
      }}>Login</button>
    </>
    )
}