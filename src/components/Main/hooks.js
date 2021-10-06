import {useContext, useRef, useEffect, useState} from 'react'
import {AppContext} from '../Global/AppContext'
import { debounce } from 'lodash';
import axios from 'axios';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';
import {retrieveAllUsersAPI, 
    retrieveAllChannelsAPI, 
    retrieveAChannelAPI,
    inviteUserToChannelAPI, 
    createAChannelAPI, 
    retrieveAllMessagesinaChannelAPI, 
    retrieveAllMessageswithaUserAPI,
    createAMessageAPI } from '../api/api'

let int1;
let int2;
let int3;
let int4;


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
    const [channel, setChannel] = useState()
    const matchesMD = useMediaQuery('(min-width: 768px)');
    const [openChannelMembersModal, setOpenChannelMembersModal] = useState(false)


    // Retrieve All Users
    const handleOpen = async() => {
        setOpen(true)
        if(users.data?.data){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            retrieveAllUsersAPI(loginUser, setIsLoading, setUsers) 
        }
    };
    // Function for adding a user in a channel
    const handleAddUser = async(data) => {
        setIsLoading(true)
        setOpen(false)
        inviteUserToChannelAPI(selectChannel, data, loginUser, state, setState, setIsLoading, setOpen, setChannel)
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
            retrieveAllUsersAPI(loginUser, setIsLoading, setUsers)
        }
    };
    // Add Channel Modal


    // Retrieve all messages in a Channel
    const retrieveMessagesinChannel = async(data) => {
        await axios.all([
            retrieveAllMessagesinaChannelAPI(data, loginUser, setAllMessages)
        ])
    }

    // For Real Time Fetching Message in Channel
    const intervalRetrieveMessagesinChannel = (data) => {
        clearTimeout(int1)
        clearTimeout(int2)
        setSelectUser('')
        retrieveAChannelAPI(data, loginUser, isLogin, setChannel, users)
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
        retrieveAllMessageswithaUserAPI(data, loginUser,setAllMessages)
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
            int1 = setInterval(() => {   
                retrieveMessagesinUser(data)
            }, 1500);    
            clearTimeout(int2)
        } else {
            int2 = setInterval(() => {   
                retrieveMessagesinUser(data)
            }, 1500);    
            clearTimeout(int1)
        }
    }
    

    // Create a Message in a channel || user
    const createAMessage = async() => {
        createAMessageAPI(selectChannel, selectUser, chatMessage, loginUser, setSelectChannel, retrieveMessagesinChannel, setSelectUser, retrieveMessagesinUser)
        chatMessage.current.value = ''
    }

    // Create a Channel
    const createAChannel = async(data) => {
        createAChannelAPI(data, channelName, loginUser, state, setState, setIsLoading, setOpen, isLogin, setChannels, setOpenAddChannel) 
    }

    

    useEffect(() => {
        // setSelectChannel('')
        // setSelectUser('')
        // axios.all([
            // Retrieve All Channels where user was invited
            retrieveAllChannelsAPI(loginUser, isLogin, setChannels)
            retrieveAllUsersAPI(loginUser, setIsLoading, setUsers)
        // ])
        
        // if(channels){
        //     setSelectChannel(channels[0])
        // }
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

    const handleOpenDM = () => {
        setOpenDM(true)
        if(users.data?.data){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            retrieveAllUsersAPI(loginUser, setIsLoading, setUsers)
        }
    };
    const filteredItems = getFilteredItems(query, users)
    const updateQuery = (e) => setQuery(e?.target?.value);
    const debounceOnChange = debounce(updateQuery, 500)


    const handleOpenChannelMembers = (data) => {
        setOpenChannelMembersModal(true)
        retrieveAChannelAPI(data, loginUser, isLogin, setChannel, users)
    }

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
        matchesMD,
        channel,
        openChannelMembersModal,
        handleOpenChannelMembers,
        setOpenChannelMembersModal
    }
}

export default useHooks