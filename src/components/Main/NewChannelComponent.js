
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { 
    TextField,
    AddIcon, 
    ButtonAddChannel, 
    UidInputContainer, 
    UsersContainer, 
    User, 
    InviteUsersTitle, 
    ContentContainer, 
    AddUserUsersContainer, 
    ContentUserProfileContainer, 
    ButtonAddUser, 
    Avatar,
    AvatarGroup,
    AvatarSmallGroup,
    Box,
    CloseIcon,
    ModalTitle
} from './components'
import {emailRemover} from '../helpers/helpers'
import {useState} from 'react'

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

const Index = (props) => {
    const {
        openAddChannel, 
        handleCloseChannel, 
        createAChannel, 
        channelName, 
        inputUsers, 
        filteredItems,
        debounceOnChange,
        classes,
        matchesMD
    } = props;

    const [usersToAdd, setUsersToAdd] = useState([])
    const [openPreAddedUsersmodal, setOpenPreAddedUsersmodal] = useState(false)

    

    const addUsersToChannel = (user) => {
        setUsersToAdd([...usersToAdd, user])
    }
    const handleOpenPreAddedUsers = () => {
        setOpenPreAddedUsersmodal(true)
    }
    
    const handleClose = () => {
        return (
            setOpenPreAddedUsersmodal(false)
        )
    };

    const deleteAddedUser = (index) => {
        usersToAdd.splice(index, 1)
        setUsersToAdd([...usersToAdd])
    }


      

    return (
        <>
            <Modal
                keepMounted
                open={openAddChannel}
                onClose={handleCloseChannel}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                <ModalTitle>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Create a Channel
                    </Typography>
                        <CloseIcon onClick={handleCloseChannel}/>
                </ModalTitle>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    <UidInputContainer>
                        <TextField 
                            id="standard-basic"
                            placeholder="e.g Work Channel" 
                            variant="standard" 
                            InputProps={{ 
                                disableUnderline: true, 
                                classes: {
                                input: classes.resize,
                            }, }}
                            inputRef={channelName}
                        />
                    </UidInputContainer>
                    <InviteUsersTitle>Invite users to the new channel</InviteUsersTitle>
                    <UidInputContainer>
                        <TextField 
                            id="standard-basic"
                            variant="standard" 
                            InputProps={{ 
                                disableUnderline: true, 
                                classes: {
                                input: classes.resize,
                            }, }}
                            inputRef={inputUsers}
                            onChange={debounceOnChange}
                            placeholder="user ID"
                        />
                    </UidInputContainer>
                    <InviteUsersTitle>Note: Type 'all' to load all users</InviteUsersTitle>
                    <AvatarGroup max={5} variant="rounded" className={classes.avatarSize} style={{cursor: 'pointer'}} onClick={handleOpenPreAddedUsers}>
                        {usersToAdd.map(user => {
                            return (
                                <AvatarSmallGroup alt={emailRemover(user.uid).toUpperCase()} src="/static/images/avatar/1.jpg" variant="rounded" />
                            )
                        })}
                    </AvatarGroup>
                    <UsersContainer>
                        {filteredItems === null ? '' :
                            filteredItems.length > 0 ?
                                filteredItems.map((user, index) => {
                                    return (
                                    <AddUserUsersContainer key={index} onClick={() => addUsersToChannel(user)}>
                                        <ContentUserProfileContainer>
                                            <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                                {emailRemover(user.uid).charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ContentUserProfileContainer>
                                        <User>{emailRemover(user.uid).substring(0, 25) + (emailRemover(user.uid).length > 25? '...' : '')}{matchesMD && <ButtonAddUser><AddIcon /></ButtonAddUser>}</User>
                                    </AddUserUsersContainer>
                                )})
                                :
                                <h1 style={{textAlign: 'center'}}>No user available</h1>
                        }
                    </UsersContainer>
                    <ButtonAddChannel variant="contained" startIcon={<AddIcon />} onClick={() => createAChannel(usersToAdd)}>Add Channel</ButtonAddChannel>
                </Typography>
                </Box>
            </Modal> 


            <Modal
                keepMounted
                open={openPreAddedUsersmodal}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} style={{maxHeight: '35rem',
                    overflowY: 'auto',
                    minHeight: '35rem'}}>
                        {usersToAdd.map((user, index) => {
                            return (
                                <AddUserUsersContainer key={index}>
                                    <ContentUserProfileContainer>
                                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                            {emailRemover(user.uid).charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ContentUserProfileContainer>
                                    <User>{emailRemover(user.uid).substring(0, 25) + (emailRemover(user.uid).length > 25? '...' : '')}<ButtonAddUser onClick={() => deleteAddedUser(index)}>Delete</ButtonAddUser></User>
                                </AddUserUsersContainer>
                            )
                        })}
                </Box>
            </Modal>
        </>
    )
}

export default Index
