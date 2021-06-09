import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import {list, get, create, remove, put} from '../../services/vehiculoServices'
import {Card} from '../../components/Cards/vehiculoCard'
import {ItemList, Titulo, FormCrear, Creando, Spinner, SubmitButton} from './styles'
import {AlertExitosa} from '../../components/Alerts/AlertExitosa'
import { Modal, Button } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image'

export const Vehiculos = ({}) => {

    const [state, setState] = useState(
        {
            formCreate: {
                placa: "",
                color: "",
                marca: "",
                referencia: ""
            },
            listVehiculos: [],
            textExitosa: "",
            showExitosa: false,
            showFormCrear: true,            
            showModal: false,
            user: JSON.parse(localStorage.getItem('logueado'))._id
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
            listVehiculos: rtaGet.data.body,
            showExitosa: false,
        })
    }

    const finishCreate = async () => {
        var rtaGet = await list()
        setState({
            ...state,
            listVehiculos: rtaGet.data.body,
            showExitosa: false,
            textExitosa: "Vehiculo creado correctamente",
            showExitosa: true,
            showModal: false

        })
    }

    const handleClose = () => {
        setState({
            ...state,
            showModal: false,
            formCreate: {
                placa: "",
                color: "",
                marca: "",
                referencia: ""
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
            user: state.user,
            placa: state.formCreate.placa,
            color: state.formCreate.color,
            marca: state.formCreate.marca,
            referencia: state.formCreate.referencia,
        }

        setState({
            ...state,
            showFormCrear: false,
        })

        let rtaCreate = await create(newClient)

        handleClose()

        if(!rtaCreate){
            alert("Error creando el vehiculo. Recuerde que no pueden existir dos vehiculos con el mismo nombre. Si el problema persiste intentelo mas tarde o contacte con soporte.")
        }

        else if(rtaCreate.data.error && rtaCreate.data.error !== "" ){
            alert("Error creando el vehiculo. Revise cuidadosamente los datos que esta ingresando.")
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
                placa: "",
                color: "",
                marca: "",
                referencia: ""
            },
            listVehiculos: rtaGet.data.body,
            user: JSON.parse(localStorage.getItem('logueado'))._id,
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
                            <Modal.Title>Crear vehiculo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleCreate}> 
                                <fieldset>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Placa</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="placa" onChange={handleChange} name="placa" className="form-control form-control-sm" value={state.formCreate.placa} placeholder="Placa del vehiculo" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Color</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="color" onChange={handleChange} name="color" className="form-control form-control-sm" value={state.formCreate.color} placeholder="Color del vehiculo" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Marca</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="marca" onChange={handleChange} name="marca" className="form-control form-control-sm" value={state.formCreate.marca} placeholder="Marca del vehiculo" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label col-form-label-sm">Referencia</label>
                                        <div className="col-sm-10">
                                            <input type="text" id="referencia" onChange={handleChange} name="referencia" className="form-control form-control-sm" value={state.formCreate.referencia} placeholder="Año de referencia del vehiculo" />
                                        </div>
                                    </div>
                                    
                                    <SubmitButton type="submit" className="btn btn-primary">Crear vehiculo</SubmitButton>
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
            <Titulo>Vehiculos</Titulo>
            <AlertExitosa show={state.showExitosa} text={state.textExitosa} handler={handler}></AlertExitosa>
        <button onClick={handleShow} className="btn btn-success mt-3">Crear vehiculo</button>
        <ul>
            {state.listVehiculos.map(item => (
                <ItemList key={item._id}>
                    <Card changeTextExitosa={changeTextExitosa} handler={handler} id={item._id} placa={item.placa} color={item.color} marca={item.marca} referencia={item.referencia}></Card>
                </ItemList>
            ))}
        </ul>
        </div>
    )
    
}