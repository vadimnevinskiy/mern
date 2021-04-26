import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext) // All data from App.js <AuthContext.Provider>
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    // Call useMessage for notification users
    // Depends of error, message, clearError
    let message = useMessage()
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    // Calls a event changeHandler
    const changeHandler = (event) => {
        // Set local state 'form' with values of fields by input name and input value
        // In our app it name="email" and name="password"
        setForm({ ...form, [event.target.name]: event.target.value })
    }




    // Register new user
    const registerHandler = async () => {
        //Try to register
        try {
            const data = await request('/api/auth/register', 'POST', {...form}) //Request to server with parametres Url, Method, form (body of form = email: <email>, password: <password>)
            message(data.message) //Tooltip for user notification = message.hook.js =  window.M.toast({html: text})
        } catch (e) {

        }
    }

    // Login
    const loginHandler = async () => {
        // Try to login
        try {
            const data = await request('/api/auth/login', 'POST', {...form}) // Request to server with parametres Url, Method, form (body of form = email: <email>, password: <password>)
            message(data.message) // Tooltip for user notification = message.hook.js =  window.M.toast({html: text})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }


    return (
        <div className="row">
            <div className="col s7 offset-s3">
                <h1>Логин</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >Войти</button>
                        <button
                            className="btn пкун lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >Регистрация</button>
                    </div>
                </div>


            </div>
        </div>
)
}
