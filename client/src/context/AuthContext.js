import {createContext} from 'react'

//Empty function
function noop() {}


//Context - set parameters for application
export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})
