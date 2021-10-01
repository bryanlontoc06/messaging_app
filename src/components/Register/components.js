import styled, { keyframes } from 'styled-components'
import MaterialContainer from '@mui/material/Container'
import MaterialButton from '@mui/material/Button'
import MaterialLink from '@mui/material/Link'
import MaterialBox from '@mui/material/Box';
import MaterialCheckbox from '@mui/material/Checkbox';
import MaterialFormHelperText from '@mui/material/FormHelperText';
import MaterialTextField from '@mui/material/TextField';
import MaterialTypography from '@mui/material/Typography';
import { fadeIn } from 'react-animations';


const fadeInAnimation = keyframes`${fadeIn}`;
    


export const Container = styled(MaterialContainer) `
    display: flex !important;
    align-items: center !important;
    height: 100vh !important;
    font-family: 'Source Sans Pro', sans-serif !important;
    text-align: center;
    display: flex;
    justify-content: center;
    animation: 1s ${fadeInAnimation};
`
export const Button = styled(MaterialButton) `
    background: #34495e;
    &:hover {
        opacity: 0.9;
        background: #34495e;
    }
`
export const Link = styled(MaterialLink) `
    color: #34495e;
    text-decoration: none;
`
export const Box = styled(MaterialBox) ``
export const Checkbox = styled(MaterialCheckbox) ``
export const FormHelperText = styled(MaterialFormHelperText) ``
export const TextField = styled(MaterialTextField) ``
export const Typography = styled(MaterialTypography) ``