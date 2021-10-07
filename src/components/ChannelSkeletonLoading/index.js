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

export const LoadingChannelMessage = () => {
    return (
        <>
            <ChatsUserProfile>
                <ContentUserProfileContainer>
                    <Avatar>
                    </Avatar>
                </ContentUserProfileContainer>
                <ChatMessageContainer>
                    <ChatUsernTime>
                        <ChatUserName></ChatUserName>
                        <ChatUserTime></ChatUserTime>
                    </ChatUsernTime>
                    <ChatMessages></ChatMessages>
                </ChatMessageContainer>
            </ChatsUserProfile>
            <ChatsUserProfile>
                <ContentUserProfileContainer>
                    <Avatar>
                    </Avatar>
                </ContentUserProfileContainer>
                <ChatMessageContainer>
                    <ChatUsernTime>
                        <ChatUserName></ChatUserName>
                        <ChatUserTime></ChatUserTime>
                    </ChatUsernTime>
                    <ChatMessages></ChatMessages>
                </ChatMessageContainer>
            </ChatsUserProfile>
            <ChatsUserProfile>
                <ContentUserProfileContainer>
                    <Avatar>
                    </Avatar>
                </ContentUserProfileContainer>
                <ChatMessageContainer>
                    <ChatUsernTime>
                        <ChatUserName></ChatUserName>
                        <ChatUserTime></ChatUserTime>
                    </ChatUsernTime>
                    <ChatMessages></ChatMessages>
                </ChatMessageContainer>
            </ChatsUserProfile>
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
        <AvatarSmallGroup></AvatarSmallGroup >
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

