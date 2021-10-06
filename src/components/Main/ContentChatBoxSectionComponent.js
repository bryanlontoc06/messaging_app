import {
    ContentChatBoxSection,
    ContentChatBoxHeader,
    UserDetailsContainer,
    UserID,
    UserName,
    ContentUserProfileContainer,
    ContentChatBoxBody,
    ChatBoxAddUserContainer,
    ContentChatBoxChannelTitle,
    AvatarnButton,
    Button,
    ChatsMessageandChatInput,
    ChatsContainer,
    ChatInput,
    TextField,
    SendIcon,
    Avatar
} from './components'

import {emailRemover} from '../helpers/helpers'
import ContentChatBoxBodyComponent from './ContentChatBoxBody';

const ContentChatBoxSectionComponent = (props) => {
    const {
        loginUser,
        handleClickPopOver,
        selectChannel,
        selectUser,
        allMessages,
        handleOpen,
        createAMessage,
        classes,
        chatMessage,
        matchesMD,
        channel
    } = props;
    return (
        <ContentChatBoxSection>
                   <ContentChatBoxHeader>
                        {/* <ContentChannelSearchBox>
                            <TextField 
                                id="standard-basic"
                                variant="standard" 
                                InputProps={{ 
                                    disableUnderline: true}}
                                placeholder="Search Avion School"
                            />
                        </ContentChannelSearchBox> */}
                        <UserDetailsContainer>
                            <UserID>ID: {loginUser.data.data?.id}</UserID>
                            <UserName>{emailRemover(loginUser.data.data?.uid)}</UserName>
                        </UserDetailsContainer>
                        <ContentUserProfileContainer onClick={handleClickPopOver}>
                            <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                                {loginUser.data?.data ? emailRemover(loginUser.data.data?.email).charAt(0).toUpperCase() : null}
                            </Avatar>
                        </ContentUserProfileContainer>
                   </ContentChatBoxHeader>

                   
                   <ContentChatBoxBodyComponent 
                        selectChannel={selectChannel}
                        selectUser={selectUser}
                        handleOpen={handleOpen}
                        allMessages={allMessages}
                        loginUser={loginUser}
                        createAMessage={createAMessage}
                        classes={classes}
                        chatMessage={chatMessage}
                        matchesMD={matchesMD}
                        channel={channel}
                   />
               </ContentChatBoxSection>
    )
}

export default ContentChatBoxSectionComponent
