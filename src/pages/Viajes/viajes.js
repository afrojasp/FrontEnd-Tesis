import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'

export const Viajes = ({}) => {

    const [listViajes, setList] = useState([])

    useEffect(() => {
        let mounted = true;
        
    })

    const usuario = JSON.parse(localStorage.getItem('logueado'))
    var history = useHistory()
    
}