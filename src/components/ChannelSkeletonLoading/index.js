import {
    ChatsUserProfile,
    ContentUserProfileContainer,
    Avatar,
    ChatMessageContainer,
    ChatUsernTime,
    ChatUserName,
    ChatUserTime,
    ChatMessages,
    Channel,
    AvatarSmallGroup,
    ContentChatBoxChannelTitle,
    UidInputContainer,
} from './components.js'

export const LoadingChannelMessage = (props) => {
    const {allMessages, loginUser} = props;
    return (
        <>
            {allMessages?.data?.data.slice(0, 4).map((data, index) => {
                return (
                    <ChatsUserProfile right={loginUser.data.data?.uid === data.sender.uid}>
                        <ContentUserProfileContainer>
                            <Avatar>
                            </Avatar>
                        </ContentUserProfileContainer>
                        <ChatMessageContainer right={loginUser.data.data?.uid === data.sender.uid}>
                            <ChatUsernTime right={loginUser.data.data?.uid === data.sender.uid}>
                                <ChatUserName></ChatUserName>
                                <ChatUserTime></ChatUserTime>
                            </ChatUsernTime>
                            <ChatMessages></ChatMessages>
                        </ChatMessageContainer>
                    </ChatsUserProfile>
                )                
            })}
        </>
    )
}

export const LoadingChannels = () => {
    return (
        <>
            <Channel></Channel>
            <Channel></Channel>
            <Channel></Channel>
        </>
    )
}

export const LoadingChannelMembers = () => {
    return (
        <AvatarSmallGroup></AvatarSmallGroup>
    )
}

export const LoadingContentChatBoxChannelTitle = () => {
    return (
        <ContentChatBoxChannelTitle></ContentChatBoxChannelTitle>
    )
}

export const LoadingDMSearchBox = () => {
    return (
        <UidInputContainer>
        </UidInputContainer>
    )
}

