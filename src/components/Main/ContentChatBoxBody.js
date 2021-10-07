import {
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
    EmptyChatBoxContainer,
    Image,
    EmptyChatTitle,
    AvatarGroup,
    AvatarSmallGroup,
    Box,
    AddUserUsersContainer,
    Avatar,
    ContentUserProfileContainer,
    User,
    MembersTitle,
    ChannelMembersContainer,
    BoxDM,
    ModalTitle,
    Typography,
    CloseIcon,
    UsersContainer
} from './components'
import ChatUserProfileComponent from './ChatUserProfileComponent'
import InputAdornment from '@mui/material/InputAdornment';
import { emailRemover } from '../helpers/helpers';
import moment from 'moment';
import ScrollableFeed from 'react-scrollable-feed';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useState, useRef, useEffect} from 'react'
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import {LoadingChannelMessage, LoadingChannelMembers, LoadingContentChatBoxChannelTitle} from '../ChannelSkeletonLoading'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const ContentChatBoxBodyComponent = (props) => {
    const {
        selectChannel,
        selectUser,
        handleOpen,
        allMessages,
        loginUser,
        createAMessage,
        classes,
        chatMessage,
        handleCloseDrawer,
        matchesMD,
        channel,
        openChannelMembersModal,
        handleOpenChannelMembers,
        setOpenChannelMembersModal
    } = props;

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    }
    
    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    
    const handleClose = () => {
        return (
            setOpenChannelMembersModal(false)
        )
    };


    return (
            <ContentChatBoxBody>
                       <ChatBoxAddUserContainer>
                            {!matchesMD && <ArrowBackIcon onClick={handleCloseDrawer}/>}
                            <ContentChatBoxChannelTitle style={{cursor: 'pointer'}} onClick={() => selectChannel && handleOpenChannelMembers(selectChannel)}>{selectChannel ? (channel ? `${selectChannel.name}(${channel.length})` : <LoadingContentChatBoxChannelTitle/>) : selectUser.uid}</ContentChatBoxChannelTitle>
                            <AvatarnButton>
                            {(selectChannel || channel && !selectUser) ?
                                (channel ?
                                <AvatarGroup max={5} variant="rounded" className={classes.avatarSize} onClick={handleOpenChannelMembers}>
                                    {channel.map((member, index) => {
                                            return (
                                                    <AvatarSmallGroup key={index} alt={emailRemover(member[0]?.uid).toUpperCase()} src="/static/images/avatar/5.jpg" variant="rounded" />
                                                )
                                        })
                                    }
                                </AvatarGroup>
                                : <LoadingChannelMembers/>)
                                : ''
                            }
                            {selectChannel && 
                                    <Button variant="contained" onClick={handleOpen} >ADD USER</Button> 
                            }
                            </AvatarnButton>
                       </ChatBoxAddUserContainer>

                       
                       <ChatsMessageandChatInput>
                                <ChatsContainer>
                                    {/* <ScrollableFeed forceScroll='true'> */}
                                    {allMessages.data?.data ?
                                        allMessages.data?.data.map((data, index)=> {
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
                                        }): <LoadingChannelMessage />}
                                    {/* </ScrollableFeed> */}
                                    <div ref={messagesEndRef} />
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
                       

                        {channel && 
                            <Modal
                                keepMounted
                                open={openChannelMembersModal}
                                onClose={handleClose}
                                aria-labelledby="keep-mounted-modal-title"
                                aria-describedby="keep-mounted-modal-description"
                            >
                                <BoxDM sx={style}>
                                    <ModalTitle>
                                        <MembersTitle>
                                            {`${selectChannel.name} members`}
                                        </MembersTitle>
                                            <CloseIcon onClick={handleClose}/>
                                    </ModalTitle>
                                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                        <UsersContainer>
                                                {channel.map((user, index) => {
                                                    return (
                                                        (user !== undefined) &&
                                                        <AddUserUsersContainer key={index}>
                                                            <Tooltip title={user[0].uid} arrow TransitionComponent={Zoom}>
                                                            <ContentUserProfileContainer>
                                                                <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                                                    {emailRemover(user[0].uid).charAt(0).toUpperCase()}
                                                                </Avatar>
                                                            </ContentUserProfileContainer>
                                                            </Tooltip>
                                                            <User>{emailRemover(user[0].uid).substring(0, 25) + (emailRemover(user[0].uid).length > 25? '...' : '')} {user[0].uid === loginUser?.data?.data?.uid && `(YOU)`}</User>
                                                        </AddUserUsersContainer>
                                                    )
                                                })}
                                        </UsersContainer>
                                    </Typography>
                                </BoxDM>
                            </Modal>
                        }
                   </ContentChatBoxBody>
    )
}

export default ContentChatBoxBodyComponent