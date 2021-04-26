import {useCallback, useEffect, useState} from "react";

// Constant storageName for saving token and userId at localstorage
const storageName = 'userData'


export const useAuth = () => {
    // Local state for token and userId
    const [token, setToken] = useState(null) //Local state for token
    const [userId, setUserId] = useState(null) //Local state for userId
    const [ready, setReady] = useState(false)


    // Login
    // Get parameters jwtToken and id
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken) // Set token at local state
        setUserId(id) // Set id at local state

        // Save data at localStorage
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))

    }, [])

    // Logout
    const logout = useCallback(() => {
        setToken(null) // Remove token at local state
        setUserId(null) // Remove id at local state
        localStorage.removeItem(storageName) // Remove data at localStorage
    }, [])

    // If first loading app
    useEffect(() => {
        // Get data from localStorage by storageName
        const data = JSON.parse(localStorage.getItem(storageName))
        // If it has data
        if(data && data.token) {
            // Calling the login() with the received data (token and id)
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])



    return { login, logout, token, userId, ready}
}
