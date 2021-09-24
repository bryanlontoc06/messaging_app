import {
    Container, 
    LogoContainer, 
    Logo,
    ContentContainer, 
    ContentChannelSection, 
    ContentChannelTitle,
    ChannelsAndMessagesContainer,
    ChannelsTitleHeader,
    AddIcon,
    ChannelsContainer,
    Channel,
    LockIcon,
    ContentChatBoxSection,
    ContentChannelSearchBox,
    TextField,
    ContentChatBoxHeader,
    ContentUserProfileContainer,
    Avatar,
    ContentChatBoxBody,
    ContentChatBoxChannelTitle,
    Button,
    ChatBoxAddUserContainer,
    AvatarGroup,
    AvatarSmallGroup,
    AvatarnButton,
    ChatInput,
    ChatsContainer,
    ChatsMessageandChatInput
} from './components'
import {useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import channel_logo from '../../assets/sampleLogo.png'
import ChatUserProfileComponent from './ChatUserProfileComponent'
import UserChatBoxComponent from './UserChatBoxComponent';

const useStyles = makeStyles({
    avatarSize: {
        '& .MuiAvatar-root.MuiAvatar-rounded.MuiAvatar-colorDefault.MuiAvatarGroup-avatar.css-16fxgir-MuiAvatar-root-MuiAvatarGroup-avatar': {
            width: '24px',
            height: '24px',
            fontSize: '0.75rem',
            background: 'unset',
            fontFamily: 'Source Sans Pro',
            color: '#34495e'
        }
    }
});

const style = {
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

const Index = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Container>
           <LogoContainer>
                <Logo src={channel_logo } />
           </LogoContainer>
           <ContentContainer>
               <ContentChannelSection>
                   <ContentChannelTitle>Avion School</ContentChannelTitle>
                   <ChannelsAndMessagesContainer>
                    <ChannelsTitleHeader>Channels <AddIcon /></ChannelsTitleHeader>
                    <ChannelsContainer>
                        <Channel><LockIcon/>Batch 11</Channel>
                        <Channel><LockIcon/>Batch 12</Channel>
                        <Channel><LockIcon/>Batch 13</Channel>
                    </ChannelsContainer>
                    <ChannelsTitleHeader>Direct Messages <AddIcon /></ChannelsTitleHeader>
                    <ChannelsContainer>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                    </ChannelsContainer>
                   </ChannelsAndMessagesContainer>
               </ContentChannelSection>

               <ContentChatBoxSection>
                   <ContentChatBoxHeader>
                        <ContentChannelSearchBox>
                            <TextField 
                                id="standard-basic"
                                variant="standard" 
                                InputProps={{ 
                                    disableUnderline: true}}
                                placeholder="Search Avion School"
                            />
                        </ContentChannelSearchBox>
                        <ContentUserProfileContainer>
                            <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                                M
                            </Avatar>
                        </ContentUserProfileContainer>
                   </ContentChatBoxHeader>
                   <ContentChatBoxBody>
                       <ChatBoxAddUserContainer>
                        <ContentChatBoxChannelTitle>Batch11</ContentChatBoxChannelTitle>
                        <AvatarnButton>
                            <AvatarGroup max={5} variant="rounded" className={classes.avatarSize} >
                                <AvatarSmallGroup alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Travis Howard" src="/static/images/avatar/2.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Cindy Baker" src="/static/images/avatar/3.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Agnes Walker" src="/static/images/avatar/4.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Trevor Henderson" src="/static/images/avatar/5.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Trevor Henderson" src="/static/images/avatar/5.jpg" variant="rounded" />
                                <AvatarSmallGroup alt="Trevor Henderson" src="/static/images/avatar/5.jpg" variant="rounded" />
                            </AvatarGroup>
                            <Button variant="contained" onClick={handleOpen}>ADD USER</Button>
                        </AvatarnButton>
                       </ChatBoxAddUserContainer>

                       <ChatsMessageandChatInput>
                            <ChatsContainer>
                                <ChatUserProfileComponent 
                                    imgSrc={''} 
                                    initial={'M'} 
                                    chatUserName={`Mari Ko`}
                                    chatUserTime={`9:01 PM`}
                                    chatMessage={`Sana may break after front end`}
                                />
                                <ChatUserProfileComponent 
                                    imgSrc={''} 
                                    initial={'S'} 
                                    chatUserName={`Santi Alley`}
                                    chatUserTime={`9:01 PM`}
                                    chatMessage={`Sana may break after front end`}
                                />
                            </ChatsContainer>
                            <ChatInput>
                                <TextField 
                                    id="standard-basic"
                                    variant="standard" 
                                    InputProps={{ 
                                        disableUnderline: true, 
                                        classes: {
                                        input: classes.resize,
                                    }, }}
                                    placeholder="Send a message to Batch11"
                                />
                            </ChatInput>
                       </ChatsMessageandChatInput>
                   </ContentChatBoxBody>
               </ContentChatBoxSection>
           </ContentContainer>

           <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box>
            </Modal>
        </Container>
    )
}

export default Index
