import {
    UidInputContainer,  
    TextField, 
    UsersContainer, 
    User,
    AddIconAddUser, 
    ContentUserProfileContainer,
    Avatar,
    AddUserUsersContainer
} from './components'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';






const AddUserComponent = (props) => {
    const {
        open,
        handleClose,
        style,
        classes,
        addUserEmail,
        searchUser,
        getSearchUser,
        users,
        emailRemover,
        handleAddUser,
    } = props;

    

    return (
        <>
           <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Add a User
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    <UidInputContainer>
                        <TextField 
                            id="standard-basic"
                            variant="standard" 
                            InputProps={{ 
                                disableUnderline: true, 
                                classes: {
                                input: classes.resize,
                            }, }}
                            inputRef={addUserEmail}
                            value={searchUser}
                            onChange={getSearchUser}
                            placeholder="search"
                        />
                    </UidInputContainer>
                    <UsersContainer>
                        {users.length > 1 ?
                            users.map((user, index) => {
                                return (
                                <>
                                    <AddUserUsersContainer key={index}>
                                        <ContentUserProfileContainer>
                                            <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                                {emailRemover(user.uid).charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ContentUserProfileContainer>
                                        <User>{emailRemover(user.uid)}<AddIconAddUser onClick={() => handleAddUser(user.id)}/></User>
                                    </AddUserUsersContainer>
                                </>
                            )})
                            :
                            <h1 style={{textAlign: 'center'}}>No user available</h1>
                        }
                    </UsersContainer>
                </Typography>
                </Box>
            </Modal> 
        </>
    )
}

export default AddUserComponent
