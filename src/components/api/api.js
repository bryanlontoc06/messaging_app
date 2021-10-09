import axios from 'axios'
import Cookies from 'js-cookie'


let url = `https://slackapi.avionschool.com/api/v1`

// Creating User Session
export const creatingUserSessionAPI = async(email, password, state, setState, setLoginUser, setIsLogin, history) => {
    await axios({
        url: `${url}/auth/sign_in`,
        data: {
            'email': email.current.value,
            'password': password.current.value,
        },
        headers: {},
        method: 'POST'
        })
    .then((res) => 
    {
        if(res.status === 200){     
            Cookies.set('user', 'loginTrue', { expires: 1 })
            setState({...state, 
            open: true,
            response: res?.data,
            })
            setLoginUser(res)
            setIsLogin(true)
        }
        setTimeout(() => {
            setState({...state, isLoading: false})
            history.push(`/app/${res.data?.data.id}`)
        },)
    } 
    )
    .catch((err) => 
    {
        console.log({err})
        const { errors } = err.response.data;
        if(err.response.status === 401) {
            setState({...state, 
                open: true,
                isLoading: false,
                responseMessage: errors[errors.length - 1],
                warning: true
            })
        } 
        else {
            setState({...state, 
                open: true,
                isLoading: false,
                responseMessage: `Internal Server Error`,
                warning: true
            })
        } 
    }
    )
}

// User Registration
export const userRegistrationAPI = async(email, password, retypePassword, state, setState, history) => {
    await axios({
        url: `${url}/auth`,
        data: {
          'email': email.current.value,
          'password': password.current.value,
          'password_confirmation': retypePassword.current.value,
        },
        headers: {},
        method: 'POST'
      })
      .then((res) => 
        {
            if(res.status === 200){
                setState({...state, 
                  open: true,
                  loading: false,
                  response: res,
                  responseMessage: `Registered successfully!`,
                  warning: false
                })
                setTimeout(() => {
                  history.push('/login')
                }, 1500)
            }
        },
      )
      .catch((err) =>
        { 
          const {full_messages} = err.response.data?.errors;
          console.log({full_messages})
          if(err.response.status === 422) {
            setState({...state, 
              open: true,
              loading: false,
              response: err.response, 
              responseMessage: full_messages[full_messages.length - 1], 
              warning: true
            })
          }
        }
      )
}

// Retrieve All Users
export const retrieveAllUsersAPI = async(loginUser, setIsLoading, setUsers) => {
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


// Retrieve all channels
export const retrieveAllChannelsAPI = async(loginUser, isLogin, setChannels) => {
    await axios({
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

// Retrieve a Channel
export const retrieveAChannelAPI = async(data, loginUser, isLogin, setChannel, users) => {
    await axios({
        url: `${url}/channels/${data?.id}`,
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
                setChannel(res?.data.data.channel_members.map((channel) => {return users.data?.data.filter((user) => {return user.id === channel.user_id})}))
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

// Invite User to a channel
export const inviteUserToChannelAPI = async(selectChannel, data, loginUser, state, setState, setIsLoading, setOpen, setChannel, users, isLogin) => {
    await axios({
        url: `${url}/channel/add_member`,
        data: {
            'id': selectChannel.id,
            'member_id': data.id,
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
                            retrieveAChannelAPI(selectChannel, loginUser, isLogin, setChannel, users)
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

// Create a Channel
export const createAChannelAPI = async(data, channelName, state, setState, setIsLoading, setOpen, setChannels, setOpenAddChannel, selectChannel, loginUser, isLogin, setChannel, users) => {
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
                console.log({selectChannel})
                console.log({loginUser})
                console.log({isLogin})
                console.log({setChannel})
                console.log({users})
                retrieveAChannelAPI(selectChannel, loginUser, isLogin, setChannel, users)
                retrieveAllChannelsAPI(loginUser, isLogin, setChannels)
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

// Retrieve All Messages in a Channel
export const retrieveAllMessagesinaChannelAPI = async(data, loginUser, setAllMessages) => {
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

// Retrieve All Messages with a User
export const retrieveAllMessageswithaUserAPI = async(data, loginUser,setAllMessages) => {
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

// Create a Message in a channel || user
export const createAMessageAPI = async(selectChannel, selectUser, chatMessage, loginUser, setSelectChannel, retrieveMessagesinChannel, setSelectUser, retrieveMessagesinUser) => {
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
}