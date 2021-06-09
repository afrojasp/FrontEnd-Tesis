import React from 'react'
import Context from '../Context'
import {Login} from '../components/Login/login'

export const NotRegisteredUser = () => (
    <Context.Consumer>
        {
            ({activateAuth}) => {
                return <Login onSubmit={activateAuth} />
            }
        }
    </Context.Consumer>
)