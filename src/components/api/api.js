import axios from 'axios'

let url = `http://206.189.91.54/api/v1`

// Creating a user session
export const creatingSessionAPI = async(email, password) => {
    await axios({
        url: `${url}/auth/sign_in`,
        data: {
            'email': email.current.value,
            'password': password.current.value,
        },
        headers: {},
        method: 'POST'
        })
}

// User Registration
export const userRegistrationAPI = async(email, password, retypePassword) => {
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
}

// Retrieve All Users
export const retrieveAllUsersAPI = async(loginUser) => {
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
}

// Invite user to a channel
export const inviteUsersAPI = async(selectChannel, id, loginUser) => {
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
}

// Retrieve all Channels where was invited
export const retrieveAllChannelsAPI = async(loginUser) => {
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
}

// Retrieve All Messages in a Channel
export const retrieveAllMessagesinChannelAPI = async(loginUser, data) => {
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
}

// Retrieve All Messages with a User
export const retrieveAllMessageswithaUserAPI = async(loginUser, data) => {
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
}

// Create Message in a Channel
// Create Direct Message to a User
export const createAMessageAPI = async(loginUser, selectChannel, selectUser, chatMessage) => {
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
}