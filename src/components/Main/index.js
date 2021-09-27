import {
    style,
    useStyles,
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
    ChatsMessageandChatInput,
    UidInputContainer,
    ButtonAddUser,
    UsersContainer,
    User,
    AddIconAddUser
} from './components'
import {useState, useEffect, useRef} from 'react'

import Typography from '@mui/material/Typography';
import channel_logo from '../../assets/sampleLogo.png'
import ChatUserProfileComponent from './ChatUserProfileComponent'
import UserChatBoxComponent from './UserChatBoxComponent';
import Popover from '@mui/material/Popover';
import useHooks from './hooks'
import axios from 'axios';
import Cookies from 'js-cookie';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddChannelModalComponent from './NewChannelComponent'
import {emailRemover} from '../helpers/helpers'
import AddUserModalComponent from './AddUserComponent'




const Index = () => {
    const classes = useStyles();
    const {isLogin,
        setIsLogin, 
        loginUser, 
        setLoginUser} = useHooks();
    const addUserEmail = useRef('')
    const [channels, setChannels] = useState()
    const [selectChannel, setSelectChannel] = useState('')
    const [users, setUsers] = useState('')
    const [searchUser, setSearchUser] = useState('')
    const [searchResults, setSearchResults] = useState('')
    
    // Modal for Adding User in a Channel
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = async() => {
        setOpen(true)
        if(users.data?.data){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            await axios({
                url: 'http://206.189.91.54/api/v1/users',
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
                    if(res.status === 200) {
                        setIsLoading(false)
                        setUsers(res)
                    } 
                }
            )
            .catch((err) => {
                console.log(err)
            })
        }
    };
    const handleClose = () => setOpen(false);



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


    // Add Channel Modal
    const [openAddChannel, setOpenAddChannel] = useState(false);
    const handleOpenAddChannel = () => setOpenAddChannel(true);
    const handleCloseChannel = () => setOpenAddChannel(false);
    // Add Channel Modal


    // Function for adding a user in a channel
    const handleAddUser = async () => {
        console.log(addUserEmail.current.value)
    }
    

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
    
    const searchHandler = (searchUser) => {
        setSearchUser(searchUser)
        if(searchUser !== "") {
            const newUsersList = users.data?.data.filter((user) => {
                return Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchUser.toLowerCase())
            })
            setSearchResults(newUsersList)
        } else {
            setSearchResults(users.data?.data)
        }
    }

    const getSearchUser = () => {
        searchHandler(addUserEmail.current.value)
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
                    <ChannelsTitleHeader>Channels <AddIcon onClick={handleOpenAddChannel}/></ChannelsTitleHeader>
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
                                {loginUser.data?.data ? emailRemover(loginUser.data.data?.email).charAt(0).toUpperCase() : null}
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

            {/* Modal for Add User  */}
            {users.data?.data  &&
            <AddUserModalComponent
                open={open}
                handleClose={handleClose}
                style={style}
                classes={classes}
                addUserEmail={addUserEmail}
                searchUser={searchUser}
                getSearchUser={getSearchUser}
                users={searchUser.length < 1 ? users.data?.data : searchResults}
                emailRemover={emailRemover}
                handleAddUser={handleAddUser}
            />}
            {isLoading  &&
            <Backdrop
                sx={{ color: '#fff' ,zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
            

            {/* For Logout */}
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

            {/* Modal for Add Channel */}
            <AddChannelModalComponent
                openAddChannel={openAddChannel}
                handleCloseChannel={handleCloseChannel}
            />
        </Container>
        </>
    )
}

export default Index;
