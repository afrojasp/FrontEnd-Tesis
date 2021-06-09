import styled from 'styled-components'

export const IconStyles = {
    color:"black",
    fontSize: "1.5rem",
    margin: "5px"
}

export const SubmitButton = styled.button`
    display: ${props => (!props.formDisabled ? 'inline-block' : 'none')};
    background-color: black;
    border: black;
`

export const DivButtons = styled.div`
    float:right;
`
export const Anchor = styled.a`
    &:hover {
        cursor: pointer;
      }
`

export const Cardiv = styled.div`
    box-shadow: 10px 0px 14px rgba(0, 0, 0, 0.2);
    width: auto;
`

export const Spinner = styled.div`
      text-align: center;
`

export const Eliminando = styled.div`
    display: ${props => (!props.siNo ? 'inline' : 'none')};
`

export const SiNoEliminar = styled.div`
    display: ${props => (props.siNo ? 'inline' : 'none')};
`