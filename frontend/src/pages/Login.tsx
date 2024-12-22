import { useNavigate } from "react-router"
import "./css/login.css"

export default function Login() {
    const navigate = useNavigate()

    function handleFormLogin(formData: FormData){
      const data = Object.fromEntries(formData)
      console.log(data)
      localStorage.setItem('loggedin', 'true')
      navigate('/')
    }

    function handleMicrosoftLogin(){
      window.location.href = '/api/auth/microsoft'
    }

    return (
    <div className="login-container" >
      <h1>Sign in to your account</h1>
      <form className="login-form" action={handleFormLogin}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="joe@domain.com" />
        <label htmlFor="password">Password</label>
        <input name="password" type="password" placeholder="********" />
        <button>LOGIN</button>
      </form>
      <button onClick={handleMicrosoftLogin}>Sign in with Microsoft</button>
    </div>
    )
}