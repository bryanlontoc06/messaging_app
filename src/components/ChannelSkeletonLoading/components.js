import styled from 'styled-components'
import MaterialAvatar from '@mui/material/Avatar';
import MaterialSkeleton from '@mui/material/Skeleton';

export const Avatar = styled(MaterialAvatar) `
    width: 38px !important;
    height: 38px !important;
    margin-left: auto;
`
export const ChatMessageContainer = styled.div `
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 80%;
    word-wrap: break-word;
    text-align: ${props => props.right ? 'right' : ''};
    @media (min-width: 768px) {
        width: calc(100vh - 80%);
    }
`
export const ChatMessages = styled(MaterialSkeleton)     `
    font-size: 0.875rem;
    font-weight: normal;
    /* background: #e8edea; */
    border-radius: 8px;
    padding: 0.5rem
`
export const ChatUsernTime = styled.div `
    display: flex;
    flex-direction: column;
    align-items: ${props => props.right ? 'flex-end' : ''};
`
export const ChatUserName = styled(MaterialSkeleton) `
    cursor: pointer;
    width: 8rem;
`
export const ChatUserTime = styled(MaterialSkeleton) `
    font-weight: 400 !important;
    font-size: 0.7rem;
    width: 5rem;
` 
export const ChatsUserProfile = styled.div `
    display: flex;
    flex-direction: ${props => props.right ? 'row-reverse' : ''};
    gap: 9px;
    padding: 0 1rem 0 0;
    margin-top: 0.8rem;
`
export const ContentUserProfileContainer = styled(MaterialSkeleton) `
    cursor: pointer;
    /* border-radius: 100% !important; */
    width: 4rem !important;
    height: 4rem !important;
    margin-left: auto;
    margin-right: 0.6875rem;
    @media (min-width: 768px) {
        margin-left: unset;
    }
`
export const Channel = styled(MaterialSkeleton) `
    height: 4rem !important;
`
export const AvatarSmallGroup = styled(MaterialSkeleton) `
    width: 75px !important;
    height: 34px !important;
    font-size: 0.8rem !important;
    margin-right: 0.5rem !important;
`
export const ContentChatBoxChannelTitle = styled(MaterialSkeleton) `
    font-weight: bold;
    color: #34495e;
    font-size: 1.125rem;
    margin-left: 0.5rem;
    width: 8rem !important;
    height: 2rem !important;
`
export const UidInputContainer = styled(MaterialSkeleton) `
    padding: 0.5rem 0.75rem;
    height: 3rem !important;
    margin-bottom: 1rem !important;
`