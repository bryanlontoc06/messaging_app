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
import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import channel_logo from '../../assets/sampleLogo.png'
import ChatUserProfileComponent from './ChatUserProfileComponent'
import UserChatBoxComponent from './UserChatBoxComponent';
import { Redirect } from 'react-router-dom';    
import Popover from '@mui/material/Popover';
import useHooks from './hooks'
import axios from 'axios';
import Cookies from 'js-cookie';


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

const Index = (props) => {
    const { authorized } = props;
    const classes = useStyles();
    const {isLogin,
        setIsLogin, 
        loginUser, 
        setLoginUser} = useHooks();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [channels, setChannels] = useState()
    const [selectChannel, setSelectChannel] = useState('')


    // Pop Over
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClickPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopOver = () => {
        setAnchorEl(null);
    };
    const openPopOver = Boolean(anchorEl);
    const idPopOver = open ? 'simple-popover' : undefined;
    // Pop Over
    

    // Retrieve All Channels where was invited
    useEffect(() => {
        axios({
            url: 'http://206.189.91.54/api/v1/channels',
            data: {},
            headers: {
                'access-token': loginUser.headers?.['access-token'],
                'client': loginUser.headers?.client,
                'expiry': loginUser.headers?.expiry,
                'uid': loginUser.headers?.uid
            } || {},
            method: 'GET'
            })  
            .then((res) => 
                {
                    if(isLogin){
                        setChannels(res?.data)
                        // setIsLogin(true)
                    }
                }
            )
            .catch((err) => {
                if(!isLogin){
                    return
                } else {
                    console.error('Error in main page', err)
                }
            })
    }, [])


    // if(!authorized) {
    //     return <Redirect exact to='/login'/>
    // }
    const handleLogout = () => {
        setIsLogin(false)
        Cookies.remove('user')
        setLoginUser({});
    }
    
    return (
        <> 
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
                        {channels?.data.map((data) => {
                            return (<Channel key={data.id} active={selectChannel.id === data.id} onClick={() => setSelectChannel(data)}>{/*<LockIcon/>*/}{data.name}</Channel>)
                        })}
                        {/* <Channel active={true}><LockIcon/>Batch 11</Channel>
                        <Channel><LockIcon/>Batch 12</Channel>
                        <Channel><LockIcon/>Batch 13</Channel> */}
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
                        <ContentUserProfileContainer onClick={handleClickPopOver}>
                            <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                                {loginUser.data?.data ? loginUser.data.data?.email.split("@")[0].charAt(0).toUpperCase() : null}
                            </Avatar>
                        </ContentUserProfileContainer>
                   </ContentChatBoxHeader>
                   <ContentChatBoxBody>
                       <ChatBoxAddUserContainer>
                        <ContentChatBoxChannelTitle>{selectChannel.name}</ContentChatBoxChannelTitle>
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

            
            <div>
                <Popover
                    id={idPopOver}
                    open={openPopOver}
                    anchorEl={anchorEl}
                    onClose={handleClosePopOver}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography sx={{ p: 2 }} style={{cursor: 'pointer'}} onClick={() => handleLogout()}>Logout</Typography>
                </Popover>
            </div>
        </Container>
        </>
    )
}

export default Index;
