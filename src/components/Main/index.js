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
    AvatarnButton,
    ChatInput,
    ChatsContainer,
    ChatsMessageandChatInput,
    SendIcon
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
import SnackbarComponent from '../Snackbars/index'
import useSessionStorage from '../helpers/useSessionStorage';

import InputAdornment from '@mui/material/InputAdornment';




const Index = () => {
    const classes = useStyles();
    const {isLogin,
        setIsLogin, 
        loginUser, 
        setLoginUser} = useHooks();
    const addUserEmail = useRef('')
    // const [channels, setChannels] = useSessionStorage(`channels`, '')
    const [channels, setChannels] = useState('')
    // const [selectChannel, setSelectChannel] = useSessionStorage(`selectedChannel`,'')
    const [selectChannel, setSelectChannel] = useState('')
    const [users, setUsers] = useState('')
    const [searchUser, setSearchUser] = useState('')
    const [searchResults, setSearchResults] = useState('')
    const chatMessage = useRef('')
    // const [allMessages, setAllMessages] = useSessionStorage(`allMessages`, ``)
    const [allMessages, setAllMessages] = useState(``)
    const [state, setState] = useState({
        open: false,
        message: '',
        warning: false,
    })
    const messagesEndRef = useRef(null)
    
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    useEffect(() => {if(allMessages) {scrollToBottom()}}, [allMessages]);
    
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
    // Function for adding a user in a channel
    const handleAddUser = async(id) => {
        setIsLoading(true)
        setOpen(false)
        await axios({
            url: 'http://206.189.91.54/api/v1/channel/add_member',
            data: {
                'id': selectChannel.id,
                'member_id': id,
            },
            headers: {
                'access-token': loginUser.headers?.['access-token'],
                'client': loginUser.headers?.client,
                'expiry': loginUser.headers?.expiry,
                'uid': loginUser.headers?.uid
            } || {},
            method: 'POST'
        })  
        .then((res) => 
            {   
                console.log(res.data.data?.id.length > 0)
                console.log(res)
                if(res.status === 200) {
                    setTimeout(() => {
                            if(res.data.data?.id) {
                                setState({...state, 
                                    open: true, 
                                    message: `Added Successfully!`, 
                                    warning: false
                                })
                                setIsLoading(false)
                            } 
                            else {
                                setState({...state, 
                                    open: true, 
                                    message: `User is already a member of this channel!`, 
                                    warning: true
                                })
                                setIsLoading(false)
                            } 
                    }, 1000);
                }
            }
        )
        .catch((err) => {
            console.log(err)
        })
    }
    const handleCloseAddUserModal = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        };
        setState({
          ...state, open: false,
        })
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
    const handleOpenAddChannel = async() => {
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
            setUsers(res)
        )
        .catch((err) => {
            console.log(err)
        })
        setOpenAddChannel(true);
    };
    const handleCloseChannel = () => setOpenAddChannel(false);
    // Add Channel Modal


    // Retrieve all messages in a Channel
    const retrieveMessagesinChannel = (data) => {
        setSelectChannel(data)

        axios({
            url: `http://206.189.91.54/api/v1/messages?receiver_id=${data.id}&receiver_class=Channel`,
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
                    if(res?.status === 200) {
                        setAllMessages(res)
                    } 
                }
            )   
            .catch((err) => {console.log(err)})
    }



    // Create a Message in a channel
    const createAMessage = (data) => {
        axios({
            url: `http://206.189.91.54/api/v1/messages`,
            data: data,
            headers: {
                'access-token': loginUser.headers?.['access-token'],
                'client': loginUser.headers?.client,
                'expiry': loginUser.headers?.expiry,
                'uid': loginUser.headers?.uid
            } || {},
            method: 'POST'
        })
        .then((res) => 
            {
                    setSelectChannel(selectChannel)
                    retrieveMessagesinChannel(selectChannel)
            }
        )   
        .catch((err) => {console.log(err)})
        chatMessage.current.value = ''
    }

    // Retrieve a Channel
    useEffect(() => {
        axios.all([
            // Retrieve All Channels where user was invited
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
                            setChannels(res?.data.data)
                        }
                    }
                )
                .catch((err) => {
                    if(!isLogin){
                        return
                    } else {
                        console.error('Error in main page', err)
                    }
                }),
        ])
        
        console.log(channels)
        if(channels){
            setSelectChannel(channels[0])
        }
    }, [])


    
    

    // Logout a user 
    const handleLogout = () => {
        setIsLogin(false)
        Cookies.remove('user')
        setLoginUser({});
    }


    const searchHandler = (searchUser) => {
        const sortedUsers = users.data?.data.filter(user => {return !(JSON.stringify(user?.id).includes(loginUser.data.data?.id))})
        setSearchUser(searchUser)
        if(searchUser !== "") {
            const newUsersList = sortedUsers.filter((user) => {
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
                        {channels &&
                            channels.map((data) => {
                                return (<Channel key={data.id} active={selectChannel.id === data.id} onClick={() => {return retrieveMessagesinChannel(data)}}>{data.name}</Channel>)
                             })
                        }
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
                        <ContentChatBoxChannelTitle>{selectChannel && selectChannel.name}</ContentChatBoxChannelTitle>
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

                       {selectChannel &&
                       <ChatsMessageandChatInput>
                            <ChatsContainer>
                                    {allMessages.data?.data.map((data, index)=> {
                                        return (
                                        <ChatUserProfileComponent 
                                            key={index}
                                            imgSrc={''} 
                                            initial={emailRemover(data.sender.uid).charAt(0).toUpperCase()} 
                                            chatUserName={emailRemover(data.sender.uid)}
                                            chatUserTime={`9:01 PM`}
                                            chatMessage={data.body}
                                        />)
                                    })}
                                <div ref={messagesEndRef} />
                            </ChatsContainer>
                            
                            <form onSubmit={(e) => 
                                {
                                    e.preventDefault()
                                    createAMessage({
                                        'receiver_id': selectChannel.id,
                                        'receiver_class': 'Channel',
                                        'body': chatMessage.current.value,
                                        
                                    })
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
                                                  <SendIcon onClick={() => createAMessage({
                                                        'receiver_id': selectChannel.id,
                                                        'receiver_class': 'Channel',
                                                        'body': chatMessage.current.value,
                                                        
                                                    })}/>
                                                </InputAdornment>
                                              ), }}
                                        
                                        placeholder={`Send a message to ${selectChannel.name}`}
                                        inputRef={chatMessage}
                                    />
                                </ChatInput>
                                
                            </form>
                            
                       </ChatsMessageandChatInput>
                    }
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
                selectChannel={selectChannel}
                loginUser={loginUser}
            />}
            {isLoading  &&
                <Backdrop
                    sx={{ color: '#fff' ,zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
            

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
                usersList={users}
            />

            {/* Snackbar */}
            <SnackbarComponent 
                isOpen={state.open} 
                close={handleCloseAddUserModal}
                message={state.message}
                status={state.warning ? `warning` : `success`}
            />
        </Container>
        </>
    )
}

export default Index;
