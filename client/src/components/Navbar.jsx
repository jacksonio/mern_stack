import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import './Navbar.css'
export const Navbar = () => {
    const history = useHistory()
    const {logout} = useContext(AuthContext)
    const logoutHandler = (e) => {
        e.preventDefault()
        logout()
        history.push('/')
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo text_margin_left">Minify the link</a>
                    <ul className="right hide-on-med-and-down">
                        <li><NavLink to='/create'>Create</NavLink></li>
                        <li><NavLink to='/links'>Links</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
