import logo from "../assets/logoipsum.svg"

export default function Homepage() {
    return (
    <>
      <h1>Homepage of Zenith!</h1>
      <img src={logo} alt="logo" />
      <button onClick={() => {
        localStorage.removeItem('loggedin')
        window.location.reload()
      }
        }>Logout</button>
    </>
    )
}