import styled from 'styled-components'
import MaterialTextField from '@mui/material/TextField';
import MaterialNotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import MaterialEventBusyIcon from '@mui/icons-material/EventBusy';

export const Container = styled.div `
    padding: 0.75rem 0.9375rem;
    padding-top: 0.625rem;
`
export const ProfileDetailsContainer = styled.div `
    display: flex;
    gap: 1.25rem;
`
export const ProfileName = styled.span `
    font-size: 1.25rem;
    font-weight: bold;
`
export const ActiveState = styled.span `
    color: #606060;
`
export const ProfileDetails = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const TextField = styled(MaterialTextField) `
    width: 100%;
    border-radius: 10px;
    margin-top: 1.5rem !important;
`
export const IconsNLabels = styled.div `
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin: 1.375rem 0 !important; 
`
export const Labels = styled.span `
    color: #606060;
`
export const NotificationsOffOutlinedIcon = styled(MaterialNotificationsOffOutlinedIcon) `
    color: #606060;
`
export const EventBusyIcon = styled(MaterialEventBusyIcon) `
color: #606060;
`