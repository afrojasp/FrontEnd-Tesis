import styled from 'styled-components'

export const DivOption = styled.div`
    text-align: center;
    margin: 50px;
`

export const ImgButton = styled.img`
    box-shadow: 10px 10px 14px rgba(0, 0, 0, 0.2);  
`

export const Anchor = styled.a`
    color: inherit;
    &:hover ${ImgButton}{
        cursor: pointer
    }
`