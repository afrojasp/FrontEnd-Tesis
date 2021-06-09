import React, { useState } from 'react'
import {login} from '../../services/userServices'
import {useHistory} from 'react-router-dom'

export const Login = ({onSubmit}) => {
    const [form, setForm] = useState(
        {
            user: "",
            password:"",
        }
    )

    let history = useHistory()

    const verifyLogin = async (e) => {
        const user = {
            user : form.user,
            password : form.password
        }
        let rta = await login(user)
        if(!rta){
            console.log("Revise usuario o contraseña")
        }
        else{
            console.log("Login correcto")
            console.log(rta.data.body[0])
            localStorage.setItem('logueado', JSON.stringify(rta.data.body[0]))
            onSubmit()
            history.push("/dashboard")
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        verifyLogin()
    }


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    

    return (
        <div className="container">
                <h1>Iniciar sesion</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Usuario:</label>
                    <input onChange={handleChange} className="form-control" type="text" name="user" value={form.user}></input>
                    
                    <label>Password:</label>
                    <input onChange={handleChange} className="form-control" type="password" name="password" value={form.password}></input>

                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                </form>

                
         </div>
    )
}