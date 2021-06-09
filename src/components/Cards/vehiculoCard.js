import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {SubmitButton, DivButtons, Anchor, Cardiv, Spinner, Eliminando, SiNoEliminar ,IconStyles} from './styles'
import {BsFillXSquareFill} from "react-icons/bs"
import {RiEdit2Fill} from "react-icons/ri"

import { Modal, Button } from 'react-bootstrap'

import {remove, put} from '../../services/vehiculoServices'




export const Card = (props) => {

    const [vehiculo, setVehiculo] = useState(
        {
            id: props.id,
            placa: props.placa,
            color: props.color,
            marca: props.marca,
            referencia: props.referencia,
            showModal: false,
            siNo: true,
            formDisabled: true
        }
    )

    var history = useHistory()

    const handleChange = e => {
        setVehiculo({
            ...vehiculo,
            [e.target.name] : e.target.value
        })
    }

    const handleClose = () => {
        setVehiculo({
            ...vehiculo,
            showModal: false
        })
    }

    const handleShow = () => {
        setVehiculo({
            ...vehiculo,
            showModal: true
        })
    }

    const handleEditClick = e => {
        setVehiculo({
            ...vehiculo,
            formDisabled: !vehiculo.formDisabled
        })
    }

    const confirmDelete = async e => {
        setVehiculo({
            ...vehiculo,
            siNo: false
        })
        
        console.log(vehiculo.id)
        var rtaDelete = await remove(vehiculo.id)
        handleClose()
        if(!rtaDelete){
            console.log("No hay rta")
            alert("Error eliminando el vehiculo")
        }
        else{
            console.log(rtaDelete)
            props.handler()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        confirmPatch()
    }

    const confirmPatch = async () => {

        const vehicle = {
            id: vehiculo.id,
            placa: vehiculo.placa,
            color: vehiculo.color,
            marca: vehiculo.marca,
            referencia: vehiculo.referencia,
        }

        let rtaPatch = await put(vehicle)

        if(!rtaPatch){
            alert("Error modificanto el vehiculo. Revise cuidadosamente los datos que esta ingresando Intentelo mas tarde. Si el problema persiste intentelo mas tarde o contacte con soporte.")
        }

        else if(rtaPatch.data.error && rtaPatch.data.error !== ""){
            alert("Error modificando el vehiculo. Revise cuidadosamente los datos que esta inrgesando.")
        }
        else{
            //console.log(rtaPatch)
            handleEditClick()
            props.changeTextExitosa("vehiculo modificado correctamente")
        }
    }

    const tipoUsuario = JSON.parse(localStorage.getItem('logueado')).tipo

    

    if(tipoUsuario ===  "JEFE"){
        return (
            <div className="container">
                <Modal show={vehiculo.showModal} onHide={handleClose}>
                    <SiNoEliminar siNo={vehiculo.siNo}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar vehiculo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Desea eliminar el vehiculo: {vehiculo.nombre}? Podría causar algunos problemas con los viajes relacionados a este vehiculo</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={confirmDelete}>
                                Si
                            </Button>
                        </Modal.Footer>
                    </SiNoEliminar>

                    <Eliminando siNo={vehiculo.siNo}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body><Spinner>
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </Spinner></Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Eliminando>
                </Modal>
                
                <Cardiv className="card ">
                    <div className="container">
                        <DivButtons>
                            <Anchor>
                                <RiEdit2Fill onClick={handleEditClick} style={IconStyles}/>
                            </Anchor>
                            <Anchor>
                                <BsFillXSquareFill onClick={handleShow} style={IconStyles}/>
                            </Anchor>
                        </DivButtons>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}> 
                            <fieldset disabled={vehiculo.formDisabled}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Placa</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="placa" onChange={handleChange} name="placa" className="form-control form-control-sm" value={vehiculo.placa} placeholder="Placa del vehiculo" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Color</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="color" onChange={handleChange} name="color" className="form-control form-control-sm" value={vehiculo.color} placeholder="Color del vehiculo" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Marca</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="marca" onChange={handleChange} name="marca" className="form-control form-control-sm" value={vehiculo.marca} placeholder="Marca del vehiculo" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Referencia</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="referencia" onChange={handleChange} name="referencia" className="form-control form-control-sm" value={vehiculo.referencia} placeholder="Año de referencia del vehiculo" />
                                    </div>
                                </div>
                                
                                <SubmitButton type="submit" formDisabled={vehiculo.formDisabled} className="btn btn-primary">Modificar vehiculo</SubmitButton>
                            </fieldset>
                        </form>
                    </div>
                </Cardiv>
            </div>
        )
    }
    else{
        <div>No tienes permitido entrar aca papanatas</div>
    }
    
}