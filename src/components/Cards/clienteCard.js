import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {SubmitButton, DivButtons, Anchor, Cardiv, Spinner, Eliminando, SiNoEliminar ,IconStyles} from './styles'
import {BsFillXSquareFill} from "react-icons/bs"
import {RiEdit2Fill} from "react-icons/ri"

import { Modal, Button } from 'react-bootstrap'

import {remove, put} from '../../services/clienteServices'
import { propTypes } from 'react-bootstrap/esm/Image'



export const Card = (props) => {

    const [cliente, setCliente] = useState(
        {
            id: props.id,
            nombre: props.nombre,
            celDespachador: props.celDespachador,
            correoDespachador: props.correoDespachador,
            celFacturas: props.celFacturas,
            correoFacturas: props.correoFacturas,
            showModal: false,
            siNo: true,
            formDisabled: true
        }
    )

    var history = useHistory()

    const handleChange = e => {
        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    const handleClose = () => {
        setCliente({
            ...cliente,
            showModal: false
        })
    }

    const handleShow = () => {
        setCliente({
            ...cliente,
            showModal: true
        })
    }

    const handleEditClick = e => {
        setCliente({
            ...cliente,
            formDisabled: !cliente.formDisabled
        })
    }

    const confirmDelete = async e => {
        setCliente({
            ...cliente,
            siNo: false
        })
        
        console.log(cliente.id)
        var rtaDelete = await remove(cliente.id)
        handleClose()
        if(!rtaDelete){
            console.log("No hay rta")
            alert("Error eliminando el cliente")
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

        const client = {
            id: cliente.id,
            nombre: cliente.nombre,
            celDespachador: cliente.celDespachador,
            correoDespachador: cliente.correoDespachador,
            celFacturas: cliente.celFacturas,
            correoFacturas: cliente.correoFacturas
        }

        let rtaPatch = await put(client)

        if(!rtaPatch){
            alert("Error modificanto el cliente. Revise cuidadosamente los datos que esta ingresando Intentelo mas tarde. Si el problema persiste intentelo mas tarde o contacte con soporte.")
        }

        else if(rtaPatch.data.error && rtaPatch.data.error !== ""){
            alert("Error modificando el cliente. Revise cuidadosamente los datos que esta inrgesando.")
        }
        else{
            //console.log(rtaPatch)
            handleEditClick()
            props.changeTextExitosa("Cliente modificado correctamente")
        }
    }

    const tipoUsuario = JSON.parse(localStorage.getItem('logueado')).tipo

    

    if(tipoUsuario ===  "JEFE"){
        return (
            <div className="container">
                <Modal show={cliente.showModal} onHide={handleClose}>
                    <SiNoEliminar siNo={cliente.siNo}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Desea eliminar el cliente: {cliente.nombre}? Podría causar algunos problemas con los viajes relacionados a este cliente</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={confirmDelete}>
                                Si
                            </Button>
                        </Modal.Footer>
                    </SiNoEliminar>

                    <Eliminando siNo={cliente.siNo}>
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
                            <fieldset disabled={cliente.formDisabled}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Nombre del cliente</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="nombre" onChange={handleChange} name="nombre" className="form-control form-control-sm" value={cliente.nombre} placeholder="Nombre del cliente" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Celular despachador</label>
                                    <div className="col-sm-10">
                                        <input type="number" id="celDespachador" onChange={handleChange} name="celDespachador" className="form-control form-control-sm" value={cliente.celDespachador} placeholder="Numero de celular del despachador" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Correo despachador</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="correoDespachador" onChange={handleChange} name="correoDespachador" className="form-control form-control-sm" value={cliente.correoDespachador} placeholder="Correo del despachador" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Celular facturas</label>
                                    <div className="col-sm-10">
                                        <input type="number" id="celFacturas" onChange={handleChange} name="celFacturas" className="form-control form-control-sm" value={cliente.celFacturas} placeholder="Numero de celular del encargado de las facturas" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label col-form-label-sm">Correo facturas</label>
                                    <div className="col-sm-10">
                                        <input type="text" id="correoFacturas" onChange={handleChange} name="correoFacturas" className="form-control form-control-sm" value={cliente.correoFacturas} placeholder="Correo del encargado de las facturas" />
                                    </div>
                                </div>
                                
                                <SubmitButton type="submit" formDisabled={cliente.formDisabled} className="btn btn-primary">Modificar cliente</SubmitButton>
                            </fieldset>
                        </form>
                    </div>
                </Cardiv>
            </div>
        )
    }
    
}