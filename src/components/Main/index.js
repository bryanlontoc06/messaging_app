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
    SendIcon,
    Typography,
    UserName
} from './components'
import {useState, useEffect, useRef} from 'react'
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
import AddDMModalComponent from './AddDMModalComponent'
import InputAdornment from '@mui/material/InputAdornment';
import ScrollableFeed from 'react-scrollable-feed'
import moment from 'moment'



const Index = () => {
    const classes = useStyles();
    const {isLogin,
        setIsLogin, 
        loginUser, 
        setLoginUser} = useHooks();
    const addUserEmail = useRef('')
    const userID = useRef('')
    const [channels, setChannels] = useState('')
    const [selectChannel, setSelectChannel] = useState('')
    const [selectUser, setSelectUser] = useState('')
    const [users, setUsers] = useState('')
    const [searchUserDM, setSearchUserDM] = useState('')
    const [searchResultsDM, setSearchResultsDM] = useState('')
    const chatMessage = useRef('')
    const [allMessages, setAllMessages] = useState(``)
    const [state, setState] = useState({
        open: false,
        message: '',
        warning: false,
    })

    var int1;
    var int2;

    // Modal for Adding User in a Channel
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
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
                                if(res.data?.errors === `User is already a member of this channel!`){
                                    setState({...state, 
                                        open: true, 
                                        message: `User is already a member of this channel!`, 
                                        warning: true
                                    })
                                    setIsLoading(false)
                                } else {
                                    setState({...state, 
                                        open: true, 
                                        message: `Invalid user`, 
                                        warning: true
                                    })
                                    setIsLoading(false)
                                } 
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
    const handleClose = () => {
        return (
            setOpen(false), 
            setOpenDM(false),
            setOpenAddChannel(false)
        )
    };
    

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
    // Add Channel Modal


    // Retrieve all messages in a Channel
    const retrieveMessagesinChannel = (data) => {
        clearTimeout(int2)
        setSelectUser('')
        setSelectChannel(data)
        // int1 = setInterval(() => {
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
        // }, 1500);
    }

    // Retrieve all messages in a User
    const retrieveMessagesinUser = (data) => {
        // clearTimeout(int1)
        setSelectChannel('')
        setSelectUser(data)
        handleClose();
        // int2 = setInterval(() => {
            axios({
                url: `http://206.189.91.54/api/v1/messages?receiver_id=${data.id}&receiver_class=User`,
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
                        // req1 = setInterval(() => {
                            if(res?.status === 200) {
                                setAllMessages(res)
                            } 
                        // }, 1500);

                    }
                )   
                .catch((err) => {console.log(err)})
        // }, 1500);
    }



    // Create a Message in a channel || user
    const createAMessage = () => {
        axios({
            url: `http://206.189.91.54/api/v1/messages`,
            data: {
                'receiver_id': selectChannel.id || selectUser.id,
                'receiver_class': selectChannel ? 'Channel' : 'User',
                'body': chatMessage.current.value,
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
                    if(selectChannel){
                        setSelectChannel(selectChannel)
                        retrieveMessagesinChannel(selectChannel)
                    } 
                    else if (selectUser) {
                        setSelectUser(selectUser)
                        retrieveMessagesinUser(selectUser)
                    }

            }
        )   
        .catch((err) => {console.log(err)})
        chatMessage.current.value = ''
    }

    // Retrieve a Channel
    useEffect(() => {
        setSelectChannel('')
        setSelectUser('')
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



    const [openDM, setOpenDM] = useState(false)
    const handleOpenDM = async() => {
        setOpenDM(true)
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

    const searchHandlerDM = (searchUserDM) => {
        const sortedUsers = users.data?.data.filter(user => {return !(JSON.stringify(user?.id).includes(loginUser.data.data?.id))})
        setSearchUserDM(searchUserDM)
        if(searchUserDM !== "") {
            const newUsersList = sortedUsers.filter((user) => {
                return Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchUserDM.toLowerCase())
            })
            setSearchResultsDM(newUsersList)
        } else {
            setSearchResultsDM(users.data?.data)
        }
    }
    const getSearchUserDM = () => {
        searchHandlerDM(addUserEmail.current.value)
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
                    <ChannelsTitleHeader>Direct Messages <AddIcon onClick={handleOpenDM}/></ChannelsTitleHeader>
                    <ChannelsContainer>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                    </ChannelsContainer>
                   </ChannelsAndMessagesContainer>
               </ContentChannelSection>

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
                        <UserName>{emailRemover(loginUser.data.data?.uid)}</UserName>
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
                                    <ScrollableFeed forceScroll='true'>
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
                                    </ScrollableFeed>
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
           </ContentContainer>

            {/* Modal for Add User  */}
            {/* {users.data?.data  && */}
            <AddUserModalComponent
                open={open}
                handleClose={handleClose}
                style={style}
                classes={classes}
                userID={userID}
                // searchUser={searchUser}
                // getSearchUser={getSearchUser}
                // users={searchUser.length < 1 ? users.data?.data : searchResults}
                emailRemover={emailRemover}
                handleAddUser={handleAddUser}
                selectChannel={selectChannel}
                loginUser={loginUser}
            />
            {/* } */}
            {isLoading  &&
                <Backdrop
                    sx={{ color: '#fff' ,zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }

            {users.data?.data  &&
                <AddDMModalComponent
                    open={openDM}
                    handleClose={handleClose}
                    style={style}
                    classes={classes}
                    addUserEmail={addUserEmail}
                    searchUser={searchUserDM}
                    getSearchUser={getSearchUserDM}
                    users={searchUserDM.length < 1 ? users.data?.data : searchResultsDM}
                    emailRemover={emailRemover}
                    selectChannel={selectChannel}
                    loginUser={loginUser}
                    retrieveMessagesinUser={retrieveMessagesinUser}
                />
            } 
            

            {/* For Logout */}
            <div>
                <Popover
                    id={idPopOver}
                    open={openPopOver}
                    anchorEl={anchorEl}
                    onClose={handleClosePopOver}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography sx={{ p: 2 }} >ID No: {loginUser.data.data?.id}</Typography>
                    <Typography sx={{ p: 2 }} >User ID: {emailRemover(loginUser.data.data?.uid)}</Typography>
                    <Typography sx={{ p: 2 }} style={{cursor: 'pointer'}} onClick={() => handleLogout()}>Logout</Typography>
                </Popover>
            </div>

            {/* Modal for Add Channel */}
            <AddChannelModalComponent
                openAddChannel={openAddChannel}
                handleCloseChannel={handleClose}
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
