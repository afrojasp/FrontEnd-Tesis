import React from 'react'
import {useHistory} from 'react-router-dom'

import {ImgButton, Anchor, DivOption} from './styles'

import viajesImg from '../../images/viaje.png'
import gastosPendientesImg from '../../images/gastos_pendientes.png'
import empleadosImg from '../../images/empleados.png'
import vehiculosImg from '../../images/vehiculos.png'
import clientesImg from '../../images/clientes.png'


export const Dashboard = ({}) => {

    const tipoUsuario = JSON.parse(localStorage.getItem('logueado')).tipo

    var history = useHistory()

    const handleClick = (e) => {
        history.push(`/${e.target.name}`)
    }

    if(tipoUsuario ===  "JEFE"){
        return (
            <div className="container">
                <div className="row">
                    <DivOption className="col-sm">
                        <Anchor  >
                            <h3>Viajes</h3>
                            <ImgButton onClick={handleClick} name="viajes" src={viajesImg} className="d-inline-block align-top" alt="ImgViajes"></ImgButton>
                        </Anchor>
                    </DivOption>
                    <DivOption className="col-sm">
                        <Anchor  >
                            <h3>Gastos pendientes</h3>
                            <ImgButton onClick={handleClick} name="gastos_pendientes" src={gastosPendientesImg} className="d-inline-block align-top" alt="ImgGastosPendientes"></ImgButton> 
                        </Anchor>
                    </DivOption>
                    <DivOption className="col-sm">
                        <Anchor  >
                            <h3>Empleados</h3>
                            <ImgButton onClick={handleClick} name="empleados" src={empleadosImg} className="d-inline-block align-top" alt="ImgEmpleados"></ImgButton>
                        </Anchor>
                    </DivOption>
                </div>

                <div className="row">
                    <DivOption className="col-sm">
                        <Anchor  >
                            <h3>Vehiculos</h3>
                            <ImgButton onClick={handleClick} name="vehiculos" src={vehiculosImg} className="d-inline-block align-top" alt="ImgVehiculos"></ImgButton>
                        </Anchor>
                    </DivOption>
                    <DivOption className="col-sm">
                        <Anchor  >
                            <h3>Clientes</h3>
                            <ImgButton onClick={handleClick} name ="clientes" src={clientesImg} className="d-inline-block align-top" alt="ImgClientes"></ImgButton>
                        </Anchor>
                    </DivOption>
                </div>
                
            </div>
        )
    }
    else if(tipoUsuario === "CONDUCTOR"){
        return(
            <div>
                <h1>Dashboard Conductor</h1>
                <button onClick={handleClick}></button>
            </div>
        )
    }

    else if(tipoUsuario === "CONTADOR"){
        return(
            <div>
                <h1>Dashboard Contador</h1>
                <button onClick={handleClick}></button>
            </div>
        )
    }
    
}