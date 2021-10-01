import styled from 'styled-components'
import MaterialContainer from '@mui/material/Container'
import MaterialButton from '@mui/material/Button'
import MaterialLink from '@mui/material/Link'
import MaterialTextField from '@mui/material/TextField';
import MaterialTypography from '@mui/material/Typography';
import MaterialBox from '@mui/material/Box';



export const Container = styled(MaterialContainer) `
    display: flex !important;
    align-items: center !important;
    height: 100vh !important;
    font-family: 'Source Sans Pro', sans-serif !important;
    text-align: center;
    display: flex;
    justify-content: center;
`
export const Button = styled(MaterialButton) `
    background: #34495e !important;
    &:hover {
        opacity: 0.9 !important;
        background: #34495e !important;
    }
`
export const Link = styled(MaterialLink) `
    color: #34495e !important;
`
export const Box = styled(MaterialBox) ``
export const TextField = styled(MaterialTextField) ``
export const Typography = styled(MaterialTypography) ``
