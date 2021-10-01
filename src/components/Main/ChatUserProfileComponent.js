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
        chatMessage,
        loginUser,
        data,
    } = props;

    return (
        <>
           <ChatsUserProfile right={loginUser.data.data?.uid === data.sender.uid}>
                <ContentUserProfileContainer>
                    <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src={imgSrc}>
                        {initial}
                    </Avatar>
                </ContentUserProfileContainer>
                <ChatMessageContainer right={loginUser.data.data?.uid === data.sender.uid}>
                    <ChatUsernTime right={loginUser.data.data?.uid === data.sender.uid}>
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
