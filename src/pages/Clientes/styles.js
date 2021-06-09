import styled from 'styled-components'

export const Titulo = styled.h2`
    text-align: center
`

export const ItemList = styled.ul`
    list-style-type: none;
    margin-bottom: 10px;
    margin-top: 40px;
`

export const FormCrear = styled.div`
    display: ${props => (props.siNo ? 'd-block' : 'none')};
`

export const Creando = styled.div`
    display: ${props => (!props.siNo ? 'inline' : 'none')};
`

export const Spinner = styled.div`
      text-align: center;
`

export const SubmitButton = styled.button`
    background-color: black;
    border: black;
`
