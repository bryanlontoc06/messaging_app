import {useContext, useRef, useEffect, useState} from 'react'
import {AppContext} from '../Global/AppContext'
import { debounce } from 'lodash';
import axios from 'axios';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';

let int1;
let int2;
let int3;
let int4;

let url = `http://206.189.91.54/api/v1`


const useHooks = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser} = useContext(AppContext)
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
    const [duplicateForChannel, setDuplicateForChannel] = useState(false);
    const [duplicateForUser, setDuplicateForUser] = useState(false);
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [openDM, setOpenDM] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAddChannel, setOpenAddChannel] = useState(false);
    const channelName = useRef('')

    const matchesMD = useMediaQuery('(min-width: 768px)');


    // Retrieve All Users
    const handleOpen = async() => {
        setOpen(true)
        if(users.data?.data){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            await axios({
                url: `${url}/users`,
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
            url: `${url}/channel/add_member`,
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
                    // setTimeout(() => {
                            if(res.data.data?.id) {
                                setState({...state, 
                                    open: true, 
                                    message: `Added Successfully!`, 
                                    warning: false
                                })
                                setIsLoading(false)
                                setOpen(false)
                            } 
                            else {
                                if(res.data?.errors[0] === `User is already a member of this channel!`){
                                    setState({...state, 
                                        open: true, 
                                        message: `User is already a member of this channel!`, 
                                        warning: true
                                    })
                                    setIsLoading(false)
                                    setOpen(false)
                                } else {
                                    setState({...state, 
                                        open: true, 
                                        message: `Invalid user`, 
                                        warning: true
                                    })
                                    setIsLoading(false)
                                    setOpen(false)
                                } 
                            } 
                    // }, 1000);
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
    const handleOpenAddChannel = async() => {
        setOpenAddChannel(true)
        if(users.data?.data){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            await axios({
                url: `${url}/users`,
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
    // Add Channel Modal


    // Retrieve all messages in a Channel
    const retrieveMessagesinChannel = async(data) => {
        await axios({
            url: `${url}/messages?receiver_id=${data.id}&receiver_class=Channel`,
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

    // For Real Time Fetching Message in Channel
    const intervalRetrieveMessagesinChannel = (data) => {
        clearTimeout(int1)
        clearTimeout(int2)
        setSelectUser('')
        setSelectChannel(data)
        retrieveMessagesinChannel(data)
        setDuplicateForChannel(!duplicateForChannel)
        if(duplicateForChannel) {
            int3 = setInterval(() => {
                retrieveMessagesinChannel(data)
            }, 1500);
            clearTimeout(int4)
        } else {
            int4 = setInterval(() => {
                retrieveMessagesinChannel(data)
            }, 1500);
            clearTimeout(int3)
        }
    }

    // Retrieve all messages in a User
    const retrieveMessagesinUser = async(data) => {
        await axios({
            url: `${url}/messages?receiver_id=${data.id}&receiver_class=User`,
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

    // For Real Time Fetching Message in User
    const intervalRetrieveMessagesinUser = (data) => {
        clearTimeout(int3)
        clearTimeout(int4)
        setSelectChannel('')
        setSelectUser(data)
        handleClose();
        retrieveMessagesinUser(data)
        setDuplicateForUser(!duplicateForUser)
        if(duplicateForUser) {
            // int1 = setInterval(() => {
                retrieveMessagesinUser(data)
            // }, 1500);
            clearTimeout(int2)
        } else {
            // int2 = setInterval(() => {
                retrieveMessagesinUser(data)
            // }, 1500);
            clearTimeout(int1)
        }
    }
    

    // Create a Message in a channel || user
    const createAMessage = async() => {
        await axios({
            url: `${url}/messages`,
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

    // Create a Message in a channel || user
    const createAChannel = async(data) => {
        await axios({
            url: `${url}/channels`,
            data: {
                'name': channelName.current.value,
                'user_ids': data
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
                if(res.data.data?.id) {
                    setState({...state, 
                        open: true, 
                        message: `Added Successfully!`, 
                        warning: false
                    })
                    setIsLoading(false)
                    setOpen(false)
                    retrieveAllChannels();
                    setOpenAddChannel(false)
                    channelName.current.value = '';
                } 
                else {
                    if(res.data?.errors[0] === `Name has already been taken`){
                        setState({...state, 
                            open: true, 
                            message: `Name has already been taken!`, 
                            warning: true
                        })
                        setIsLoading(false)
                        setOpen(false)
                    } else if (res.data?.errors[0] === `Name is too short (minimum is 3 characters)`) {
                        setState({...state, 
                            open: true, 
                            message: `Name is too short (minimum is 3 characters)`, 
                            warning: true
                        })
                        setIsLoading(false)
                        setOpen(false)
                    } else if (res.data?.errors[0] === `Name is too long (maximum is 15 characters)`) {
                        setState({...state, 
                            open: true, 
                            message:  `Name is too long (maximum is 15 characters)`, 
                            warning: true
                        })
                        setIsLoading(false)
                        setOpen(false)
                    } else if (res.data?.errors.length === 2) {
                        setState({...state, 
                            open: true, 
                            message:  `Name can't be blank.  Name is too short (minimum is 3 characters)`, 
                            warning: true
                        })
                        setIsLoading(false)
                        setOpen(false)
                    }  else {
                        setState({...state, 
                            open: true, 
                            message:  `Error`, 
                            warning: true
                        })
                        setIsLoading(false)
                        setOpen(false)
                    }
                } 
            }
        )   
        .catch((err) => {console.log(err)})
    }

    const retrieveAllChannels = async() => {
        axios({
            url: `${url}/channels`,
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
        })
    }

    useEffect(() => {
        setSelectChannel('')
        setSelectUser('')
        axios.all([
            // Retrieve All Channels where user was invited
            retrieveAllChannels()
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

    
    const getFilteredItems = (query, users) => {
        if(!query) {
            return null;
        }
        else if (query.toLowerCase() === 'all') {
            return users?.data?.data;
        }
        return users.data?.data.filter((user) => user.uid.includes(query))
    }

    const handleOpenDM = async() => {
        setOpenDM(true)
        if(users.data?.data){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            await axios({
                url: `${url}/users`,
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
    const filteredItems = getFilteredItems(query, users)
    const updateQuery = (e) => setQuery(e?.target?.value);
    const debounceOnChange = debounce(updateQuery, 500)

    
    // const searchHandlerDM = (searchUserDM) => {
    //     const sortedUsers = users.data?.data.filter(user => {return !(JSON.stringify(user?.id).includes(loginUser.data.data?.id))})
    //     setSearchUserDM(searchUserDM)
    //     if(searchUserDM !== "") {
    //         const newUsersList = sortedUsers.filter((user) => {
    //             return Object.values(user)
    //             .join(" ")
    //             .toLowerCase()
    //             .includes(searchUserDM.toLowerCase())
    //         })
    //         setSearchResultsDM(newUsersList)
    //     } else {
    //         setSearchResultsDM(users.data?.data)
    //     }
    // }
    // const getSearchUserDM = () => {
    //     searchHandlerDM(addUserEmail.current.value)
    // }
    // const debounceDMSearch = debounce(searchHandlerDM(addUserEmail.current.value), 200);

    return {
        loginUser,
        addUserEmail,
        userID,
        searchUserDM,
        searchResultsDM,
        allMessages,
        isLoading,
        handleOpen,
        handleAddUser,
        handleCloseAddUserModal,
        openAddChannel,
        handleClickPopOver,
        handleClosePopOver,
        openPopOver,
        idPopOver,
        handleOpenAddChannel,
        intervalRetrieveMessagesinChannel,
        intervalRetrieveMessagesinUser,
        createAMessage,
        handleLogout,
        openDM,
        handleOpenDM,
        filteredItems,
        debounceOnChange,
        channels,
        selectChannel,
        selectUser,
        users,
        chatMessage,
        open,
        handleClose,
        query,
        anchorEl,
        state,
        channelName,
        createAChannel,
        matchesMD
    }
}

export default useHooks