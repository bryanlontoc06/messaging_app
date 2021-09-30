import styled from 'styled-components'
import { makeStyles } from '@material-ui/styles';
import MaterialTextField from '@mui/material/TextField';
import MaterialAvatar from '@mui/material/Avatar';
import MaterialAddIcon from '@mui/icons-material/Add';
import MaterialLockIcon from '@mui/icons-material/Lock';
import MaterialButton from '@mui/material/Button'
import MaterialAvatarGroup from '@mui/material/AvatarGroup';
import MaterialSendIcon from '@mui/icons-material/Send';


export const useStyles = makeStyles((theme) => ({
    avatarSize: {
        '& .MuiAvatar-root.MuiAvatar-rounded.MuiAvatar-colorDefault.MuiAvatarGroup-avatar.css-16fxgir-MuiAvatar-root-MuiAvatarGroup-avatar': {
            width: '24px',
            height: '24px',
            fontSize: '0.75rem',
            background: 'unset',
            fontFamily: 'Source Sans Pro',
            color: '#34495e'
        }
    },
}))

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '3px solid #34495e',
    boxShadow: 24,
    p: 4,
  };

export const Container = styled.div `
    background: #f6f7fb;
    display: flex;
    height: 100vh;
    font-family: 'Source Sans Pro', sans-serif;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;

`
export const LogoContainer = styled.div `
    margin-right: 1.25rem;
    padding: 1.0625rem 0.6875rem;
    background-color: #34495e;
`
export const Logo = styled.img `
    width: 38px;
    height: 38px;
    border-radius: 5px;
`
export const ContentContainer = styled.div `
    display: flex;
    width: 100%;
`
export const ContentChannelSection = styled.div `   
    width: 30%;
`
export const ContentChannelTitle = styled.div `
    color: #34495e;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: bold;
    font-size: 1.25rem;
    padding: 1.4375rem 0rem 1.0625rem 0rem;
`
export const ContentChannelSearchBox = styled.div `
    border: solid 1px #979797;
    padding: 0.5rem 0.75rem;
    border-radius: 0.625rem;
    width: 24.125rem;
    height: 1.9375rem;
`
export const TextField = styled(MaterialTextField) `
    font-size: 0.75rem;
    width: 100%;
`
export const ContentUserProfileContainer = styled.div `
    cursor: pointer;
`
export const Avatar = styled(MaterialAvatar) `
    width: 38px !important;
    height: 38px !important;
    margin-left: auto;
`
export const ChannelsAndMessagesContainer = styled.div ``
export const ChannelsTitleHeader = styled.div `
    font-size: 1.125rem;
    color: #34495e;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.125rem; 
`
export const AddIcon = styled(MaterialAddIcon) `
    font-weight: bold;
    cursor: pointer;
`
export const ChannelsContainer = styled.div `
    height: calc(100vh - 31rem);
    overflow-y: hidden;
    
    &:hover {
        overflow-y: scroll;
        transition: overflow-y 2s;
        transition-timing-function: ease-in-out;
    }
    /* width */
    &::-webkit-scrollbar {
    width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`
export const Channel = styled.div `
    font-size: 1rem;
    font-weight: 600;
    color: #85929e;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0.6875rem 0rem 0.6875rem 1.9375rem;
    margin-top: 0.8125rem;
    background: ${props => props.active ? '#fff' : '' };
    border-radius: 7px;
    border-left: ${props => props.active ? '5px solid #9b59b6' : "" };
    cursor: pointer;
`
export const LockIcon = styled(MaterialLockIcon) `
    font-size: 0.875rem !important;
`
export const UserChatBox = styled.div `
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-weight: 600;
    color: #85929e;
    margin-top: 1.25rem;
    cursor: pointer;
`
export const UserAvatar = styled(MaterialAvatar) `
    width: 1.25rem !important;    
    height: 1.25rem !important;
    font-size: 0.8rem !important;
`
export const ContentChatBoxSection = styled.div `
    width: 75%;
    padding-left: 25px;
    position: relative;
`
export const ContentChatBoxHeader = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.125rem 1rem 1.125rem 0;
    justify-content: space-between;
`
export const ContentChatBoxBody = styled.div `
    background: #fff;
    padding: 1.5625rem 1.0625rem 1.625rem 2rem;
    height: calc(100vh - 137px);
    border-radius: 0.625rem 0 0 0;
`
export const ContentChatBoxChannelTitle = styled.div `
    font-weight: bold;
    color: #34495e;
    font-size: 1.125rem;
`
export const ChatBoxAddUserContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const Button = styled(MaterialButton) `
    font-weight: bold !important;
    background: #34495e !important;
    border-radius: 7px !important;
    width: 120px;
    height: 38px;
`
export const AvatarGroup = styled(MaterialAvatarGroup) `
    background: unset;  
`
export const AvatarSmallGroup = styled(MaterialAvatar) `
    width: 24px !important;
    height: 24px !important;
    font-size: 0.8rem !important;
`
export const AvatarnButton = styled.div `
    display: flex;
    gap: 1.75rem;
    align-items: center;
`
export const ChatInput = styled.div `
    border: solid 1px #979797;
    padding: 0.5rem 0.75rem;
    border-radius: 0.625rem;
    margin-top: 20px;
`
export const ChatsContainer = styled.div `
    display: flex;
    font-weight: bold;
    font-size: 0.875rem;
    color: #85929e;
    flex-direction: column;
    gap: 17px;
    max-height: calc(100vh - 17rem);
    overflow-y: hidden;
    
    &:hover {
        overflow-y: scroll;
        transition: overflow-y 2s;
        transition-timing-function: ease-in-out;
    }
    /* width */
    &::-webkit-scrollbar {
    width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`
export const ChatUsernTime = styled.div `
    display: flex;
    gap: 9px;
`
export const ChatUserName = styled.div `
    cursor: pointer;
`
export const ChatUserTime = styled.div `
    font-weight: 400 !important;
`   
export const ChatsUserProfile = styled.div `
    display: flex;
    gap: 9px;
`
export const ChatMessageContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: calc(100vh - 52%);
    word-wrap: break-word;
`
export const ChatMessages = styled.span `
    font-size: 0.875rem;
    font-weight: normal;
`
export const ChatsMessageandChatInput = styled.div `
    position: absolute;
    bottom: 26px;
    right: 18px;
    left: 58px;
`
export const UidInputContainer = styled.div `
    border: solid 1px #979797;
    padding: 0.5rem 0.75rem;
    border-radius: 0.625rem;
    margin-bottom: 1rem;
`

export const UsersContainer = styled.div `
    display: flex;
    flex-direction: column;
    height: calc(100vh - 31rem);
    overflow-y: auto;
    
    /* // &:hover {
    //     overflow-y: auto;
    //     transition: overflow-y 2s;
    //     transition-timing-function: ease-in-out;
    // } */
    /* width */
    &::-webkit-scrollbar {
    width: 10px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
    background: #888; 
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`
export const User = styled.span `
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: #85929e;
    cursor: pointer;
    padding: 1rem 0.5rem;
    width: 100%;
`
export const AddIconAddUser = styled(AddIcon) `
    background: #34495e;
    border-radius: 4px;
    &:hover {
        opacity: 0.8;
    }
`
export const AddUserUsersContainer = styled.div `
    display: flex;
    align-items: center;
`
export const ButtonAddUser = styled(Button) `
    color: #fff !important;
    width: unset;
`
export const SendIcon = styled(MaterialSendIcon) `
    color: #34495e !important;
    cursor: pointer;
    &:hover {
        opacity: 0.9
    }
`