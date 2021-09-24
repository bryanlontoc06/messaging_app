import {
    ChatsUserProfile, 
    ContentUserProfileContainer,
    Avatar,
    ChatMessageContainer,
    ChatUsernTime,
    ChatUserName,
    ChatUserTime,
    ChatMessages
} from './components'

const ChatUserProfileComponent = (props) => {
    const {
        imgSrc,
        initial,
        chatUserName,
        chatUserTime,
        chatMessage
    } = props;
    return (
        <>
           <ChatsUserProfile>
                <ContentUserProfileContainer>
                    <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src={imgSrc}>
                        {initial}
                    </Avatar>
                </ContentUserProfileContainer>
                <ChatMessageContainer>
                    <ChatUsernTime>
                        <ChatUserName>{chatUserName}</ChatUserName>
                        <ChatUserTime>{chatUserTime}</ChatUserTime>
                    </ChatUsernTime>
                    <ChatMessages>{chatMessage}</ChatMessages>
                </ChatMessageContainer>
            </ChatsUserProfile> 
        </>
    )
}

export default ChatUserProfileComponent
