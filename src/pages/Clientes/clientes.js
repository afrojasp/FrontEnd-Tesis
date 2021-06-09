import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {list, get, create, remove, put} from '../../services/clienteServices'
import {Card} from '../../components/Cards/clienteCard'
import {ItemList, Titulo, FormCrear, Creando, Spinner, SubmitButton} from './styles'
import {AlertExitosa} from '../../components/Alerts/AlertExitosa'
import { Modal, Button } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'

export const Clientes = ({}) => {

    const [state, setState] = useState(
        {
            formCreate: {
                nombre: "",
                celDespachador: "",
                correoDespachador: "",
                celFacturas: "",
                correoFacturas: ""
            },
            listClientes: [],
            textExitosa: "",
            showExitosa: false,
            showFormCrear: true,            
            showModal: false
        }
    )


    const changeTextExitosa = texto => {
        setState({
            ...state,
            textExitosa: texto,
            showExitosa: !state.showExitosa
        })

    }

    const handler = async () => {
        var rtaGet = await list()
        setState({
            ...state,
            listClientes: rtaGet.data.body,
            showExitosa: false,
        })
    }

    const finishCreate = async () => {
        var rtaGet = await list()
        setState({
            ...state,
            listClientes: rtaGet.data.body,
            showExitosa: false,
            textExitosa: "Cliente creado correctamente",
            showExitosa: true,
            showModal: false

        })
    }

    const handleClose = () => {
        setState({
            ...state,
            showModal: false,
            formCreate: {
                nombre: "",
                celDespachador: "",
                correoDespachador: "",
                celFacturas: "",
                correoFacturas: ""
            },
        })
    }

    const handleShow = () => {
        setState({
            ...state,
            showModal: true
        })
    }

    const handleChange = e => {
        setState(prevState => ({
            ...state,
            formCreate: {
                ...prevState.formCreate,
                [e.target.name] : e.target.value
            }
        }))
    }

    const handleCreate = async (e) => {

        e.preventDefault()

        const newClient = {
            nombre: state.formCreate.nombre,
            celDespachador: state.formCreate.celDespachador,
            correoDespachador: state.formCreate.correoDespachador,
            celFacturas: state.formCreate.celFacturas,
            correoFacturas: state.formCreate.correoFacturas
        }

        setState({
            ...state,
            showFormCrear: false,
        })

        let rtaCreate = await create(newClient)

        handleClose()

        if(!rtaCreate){
            alert("Error creando el cliente. Recuerde que no pueden existir dos clientes con el mismo nombre. Si el problema persiste intentelo mas tarde o contacte con soporte.")
        }

        else if(rtaCreate.data.error && rtaCreate.data.error !== "" ){
            alert("Error creando el cliente. Revise cuidadosamente los datos que esta ingresando.")
        }
        else{
            finishCreate()
        }
    }

    useEffect( async () => {
        var rtaGet = await list()
        setState({
            ...state,
            formCreate: {
                nombre: "",
                celDespachador: "",
                correoDespachador: "",
                celFacturas: "",
                correoFacturas: ""
            },
            listClientes: rtaGet.data.body
        })

        return () => setState({})
    }, [])

    //const usuario = JSON.parse(localStorage.getItem('logueado'))
    var history = useHistory()

    return (
        <div className="container">
            <Modal show={state.showModal} onHide={handleClose}>
                    <FormCrear siNo={state.showFormCrear}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crear cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleCreate}> 
                                <fieldset>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm"> Nombre del cliente</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="nombre" onChange={handleChange} name="nombre" className="form-control form-control-sm" value={state.formCreate.nombre} placeholder="Nombre del cliente" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Celular despachador</label>
                                        <div className="col-sm-10">
                                            <input type="number" id="celDespachador" onChange={handleChange} name="celDespachador" className="form-control form-control-sm" value={state.formCreate.celDespachador} placeholder="Numero de celular del despachador" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Correo despachador</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="correoDespachador" onChange={handleChange} name="correoDespachador" className="form-control form-control-sm" value={state.formCreate.correoDespachador} placeholder="Correo del despachador" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Celular facturas</label>
                                        <div className="col-sm-10">
                                            <input type="number" id="celFacturas" onChange={handleChange} name="celFacturas" className="form-control form-control-sm" value={state.formCreate.celFacturas} placeholder="Numero de celular del encargado de las facturas" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Correo facturas</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="correoFacturas" onChange={handleChange} name="correoFacturas" className="form-control form-control-sm" value={state.formCreate.correoFacturas} placeholder="Correo del encargado de las facturas" />
                                        </div>
                                    </div>
                                    
                                    <SubmitButton type="submit" className="btn btn-primary">Crear cliente</SubmitButton>
                                    <Button variant="secondary" onClick={handleClose}>
                                        No
                                    </Button>
                                </fieldset>
                            </form>
                        </Modal.Body>
                    </FormCrear>

                    <Creando siNo={state.showFormCrear}>
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
                    </Creando>
            </Modal>
            <Titulo>Clientes</Titulo>
            <AlertExitosa show={state.showExitosa} text={state.textExitosa} handler={handler}></AlertExitosa>
        <button onClick={handleShow} className="btn btn-success mt-3">Crear cliente</button>
        <ul>
            {state.listClientes.map(item => (
                <ItemList key={item._id}>
                    <Card changeTextExitosa={changeTextExitosa} handler={handler} id={item._id} nombre={item.nombre} celDespachador={item.celDespachador} correoDespachador={item.correoDespachador} celFacturas={item.celFacturas} correoFacturas={item.correoFacturas}></Card>
                </ItemList>
            ))}
        </ul>
        </div>
    )
    
}