import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

export default function Callback() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const code = searchParams.get('code')
        const state = searchParams.get('state')

        if (code) {
            fetch(`/api/auth/callback?code=${code}&state=${state}`)
                .then(res=>res.json())
                .then(data => {
                    if (data.token) {
                        // TODO: change token to cookie in BE
                        localStorage.setItem('loggedin', "true")
                        navigate("/")
                    }
                })
                .catch(err => {
                    console.error("Error fetching user data", err)
                })
        }
    }, [location])

    return <h1>Authenticating...</h1>
}