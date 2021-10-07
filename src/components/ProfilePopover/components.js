import styled from 'styled-components'
import MaterialTypography from '@mui/material/Typography';
import MaterialButton from '@mui/material/Button'
import MaterialAvatarGroup from '@mui/material/AvatarGroup';
import MaterialAvatar from '@mui/material/Avatar';

export const Typography = styled(MaterialTypography) `
    font-size: 0.8rem !important;
    font-family: unset !important;
`
export const AvatarGroup = styled(MaterialAvatarGroup) `
    background: unset;  
    display: flex;
    justify-content: center;
    cursor: pointer;
`
export const AvatarSmallGroup = styled(MaterialAvatar) `
    width: 24px !important;
    height: 24px !important;
    font-size: 0.8rem !important;
`
export const Button = styled(MaterialButton) `
    font-weight: bold !important;
    background: #34495e !important;
    border-radius: 7px !important;
    width: 120px;
    height: 38px;
`
export const AvatarnButton = styled.div `
    display: flex;
    gap: 1.75rem;
    align-items: center;
    margin-left: auto;
    flex-direction: column-reverse;
    padding: 0.5rem;
    gap: 0.5rem;
    @media (min-width: 768px) {
        margin-left: unset;
        flex-direction: unset;
        padding: unset;
        gap: unset;
    }
`