import React from 'react';
import logo from '../../images/logo.PNG'
import {useHistory} from 'react-router-dom'

import {Anchor} from './styles'

export const Navbar = () => {

    var history = useHistory()

    const handleClick = () => {
        history.push("/dashboard")
        console.log("hola")
    }


    return (
        <nav className="navbar navbar-light bg-light">
            <Anchor className="navbar-brand" >
                <img onClick={handleClick} src={logo} className="d-inline-block align-top" alt=""></img>
            </Anchor>
        </nav>
    )
}