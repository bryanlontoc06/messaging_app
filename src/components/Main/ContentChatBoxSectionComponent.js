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
import ScrollableFeed from 'react-scrollable-feed';
import {emailRemover} from '../helpers/helpers'
import moment from 'moment';
import ChatUserProfileComponent from './ChatUserProfileComponent'
import InputAdornment from '@mui/material/InputAdornment';

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
        chatMessage
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
                   <ContentChatBoxBody>
                       <ChatBoxAddUserContainer>
                        <ContentChatBoxChannelTitle>{selectChannel ? selectChannel.name : selectUser.uid}</ContentChatBoxChannelTitle>
                        <AvatarnButton>
                            {/* <AvatarGroup max={5} variant="rounded" className={classes.avatarSize} >
                                <AvatarSmallGroup alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Travis Howard" src="/static/images/avatar/2.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Cindy Baker" src="/static/images/avatar/3.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Agnes Walker" src="/static/images/avatar/4.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Trevor Henderson" src="/static/images/avatar/5.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Trevor Henderson" src="/static/images/avatar/5.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Trevor Henderson" src="/static/images/avatar/5.jpg" variant="rounded" />
                            </AvatarGroup> */}
                           {selectChannel && <Button variant="contained" onClick={handleOpen}>ADD USER</Button> }
                        </AvatarnButton>
                       </ChatBoxAddUserContainer>

                       {(selectChannel || selectUser)  &&
                       <ChatsMessageandChatInput>
                                <ChatsContainer>
                                    {/* <ScrollableFeed forceScroll='true'> */}
                                        {allMessages.data?.data.map((data, index)=> {
                                            return (
                                            <ChatUserProfileComponent 
                                                key={index}
                                                imgSrc={''} 
                                                initial={emailRemover(data.sender.uid).charAt(0).toUpperCase()}
                                                chatUserName={emailRemover(data.sender.uid)}
                                                chatUserTime={moment(data.created_at).fromNow()}
                                                chatMessage={data.body}
                                                loginUser={loginUser}
                                                data={data}
                                            />)
                                        })}
                                    {/* </ScrollableFeed> */}
                                </ChatsContainer>

                            <form onSubmit={(e) => 
                                {
                                    e.preventDefault()
                                    createAMessage()
                                }
                            }>
                                <ChatInput>
                                    <TextField 
                                        id="standard-basic"
                                        variant="standard" 
                                        InputProps={{ 
                                            disableUnderline: true, 
                                            classes: {
                                            input: classes.resize,
                                            },
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                  <SendIcon onClick={createAMessage}/>
                                                </InputAdornment>
                                              ), }}
                                        
                                        placeholder={`Send a message to ${selectChannel ? selectChannel.name : emailRemover(selectUser.uid)}`}
                                        inputRef={chatMessage}
                                    />
                                </ChatInput>
                                
                            </form>
                            
                       </ChatsMessageandChatInput>
                    }
                   </ContentChatBoxBody>
               </ContentChatBoxSection>
    )
}

export default ContentChatBoxSectionComponent
