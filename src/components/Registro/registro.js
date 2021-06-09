import React, { useState } from 'react'
import {create} from '../../services/userServices'

export const Register = () => {

    const [form, setForm] = useState({
        cedula: 0,
        nombre: '',
        password: '',
        numero: 0,
        tipo: '',
    })

    const handleSubmit = async e => {
        e.preventDefault()

        var user = { 
        }

        if(!form.cedula || !form.nombre || !form.password || !form.numero || !form.tipo){
            alert("Porfavor, rellene todos los campos")
        }
        else if(form.cedula.lengh !== 10){
            alert("La cedula debe tener 10 digitos")
        }
        else if(form.numero.lengh < 7){
            alert("El numero de contacto es invalido")
        }

        else{
            user.cedula = form.cedula
            user.nombre = form.nombre
            user.password = form.password
            user.numero = form.numero
            user.tipo = form.tipo
        }

        var rta = await create(user)
        if(!rta){
            console.log("El usuario ya existe")
        }
        else{
            console.log("usuario creado correctamente" + rta)
            console.log(rta.data.body)
        }
    }

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        
        <div className="container">
            <h1>Registro de empleado</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Cedula:</label>
                <input onChange={handleChange}  className="form-control" type="number" name="cedula" minLength="10" value={form.cedula}></input>
                
                <label>Nombre completo:</label>
                <input onChange={handleChange} className="form-control" type="text" name="nombre" placeholder="Nombre completo del usuario." value={form.nombre}></input>

                <label>Password:</label>
                <input onChange={handleChange} className="form-control" type="password" name="password" value={form.password}></input>

                <label htmlFor="">Numero contacto:</label>
                <input onChange={handleChange} className="form-control" type="number" name="numero" value={form.numero}></input>

                <div className="form-group">
                    <label >Tipo de usuario:</label>
                    <select onChange={handleChange} multiple className="form-control" name="tipo" id="tipo">
                        <option>CONDUCTOR</option>
                        <option>CONTADOR</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>

            
        </div>
    )
}