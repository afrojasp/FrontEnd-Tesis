import React from 'react'
import {Navbar} from './Navbar/navBar'

function Layout(props){
    return(
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
}

export default Layout