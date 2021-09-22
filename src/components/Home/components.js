import styled from 'styled-components'

import MaterialLockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MaterialCommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import MaterialAddBoxIcon from '@mui/icons-material/AddBox';
import MaterialFavoriteIcon from '@mui/icons-material/Favorite';
import {BsPencilSquare} from 'react-icons/bs'


export const Container = styled.div `
    /* height: 100vh; */
`

export const Body = styled.div `
    padding: 0.75rem 0.9375rem;
    padding-top: 0.625rem;
`




export const IconsNLabels = styled.div `
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin: 1.25rem 0 1.6875rem; 
`

export const IconsNLabelsItems = styled(IconsNLabels) `
    margin: 1.25rem 0; 
`

export const LockOutlinedIcon = styled(MaterialLockOutlinedIcon) `
    color: #474747; 
`
export const Labels = styled.span `
    color: #606060;
`

export const CommentOutlinedIcon = styled(MaterialCommentOutlinedIcon) `
    color: #474747; 
`

export const SectionTitle = styled.span `
    color: #606060;
`

export const AddBoxIcon = styled(MaterialAddBoxIcon) `
    color: #474747;
`

export const FavoriteIcon = styled(MaterialFavoriteIcon) `
    color: #008360;
    width: 0.625rem !important;
    height: 0.625rem !important;
`

export const Footer = styled.div `
    padding: 0.75rem 0.9375rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    z-index: 999;
    bottom: 0;
    justify-content: space-between;
    flex-direction: column;
    right: 0;
    left: 0;
`

export const FooterIconsNLabelsItem = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


export const FooterLabels = styled(Labels) ``
export const FooterIcons = styled.div `
    display: flex;
    justify-content: space-between;
`
export const PencilSquare = styled(BsPencilSquare)`
    font-size: 1.3rem;
`