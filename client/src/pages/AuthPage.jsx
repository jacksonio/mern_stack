import React, {useState, useEffect, useContext} from 'react'
import './styles.css'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])


    const changeHandler = event => {
        event.preventDefault()
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', "POST", {...form})
            message(data.message)
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1 className={'center-align'}>Minify your link</h1>
                <div className="card blue lighten-5 ">
                    <div className="card-content">
                        <span className="card-title teal-text">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter your email"
                                    className={'input_color'}
                                    id="email"
                                    type="text"
                                    name='email'
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email" className={'active'}>First Name</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter your password"
                                    className={'input_color'}
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    name='password'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password" className={'active'}>Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn blue lighten-2 btn_offset"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Login
                        </button>
                        <button
                            className="btn deep-purple lighten-4 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}
