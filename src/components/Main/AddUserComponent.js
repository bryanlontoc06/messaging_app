import {
    UidInputContainer,  
    TextField, 
    UsersContainer, 
    User,
    AddIconAddUser, 
    ContentUserProfileContainer,
    Avatar,
    AddUserUsersContainer,
    ButtonAddUser,
    InviteUsersTitle,
    BoxDM
} from './components'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';






const AddUserComponent = (props) => {
    const {
        open,
        handleClose,
        style,
        classes,
        userID,
        searchUser,
        getSearchUser,
        users,
        emailRemover,
        handleAddUser,
        handleDebounceAddUser,
        filteredItems,
        debounceOnChange,
        query,
        matchesMD
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
                <BoxDM sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Add user
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    {/* <form onSubmit={(e) => {
                        // e.preventDefault();
                        // handleAddUser(userID.current.value)
                        // userID.current.value = ''
                    }}> */}
                        <UidInputContainer>
                            <TextField 
                                id="standard-basic"
                                variant="standard" 
                                type='text'
                                InputProps={{ 
                                    disableUnderline: true, 
                                    classes: {
                                    input: classes.resize,
                                }, }}
                                inputRef={userID}
                                // value={searchUser}
                                // onChange={getSearchUser}
                                onChange={debounceOnChange}
                                placeholder="user ID"
                            />
                        </UidInputContainer>
                    {/* </form> */}
                    {/* <UsersContainer>
                        {users.length > 1 ?
                            users.map((user, index) => {
                                return (
                                <AddUserUsersContainer key={index}>
                                    <ContentUserProfileContainer>
                                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                            {emailRemover(user.uid).charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ContentUserProfileContainer>
                                    <User>{emailRemover(user.uid).substring(0, 25) + (emailRemover(user.uid).length > 25? '...' : '')}<ButtonAddUser onClick={() => handleAddUser(user.id)}>Add</ButtonAddUser></User>
                                </AddUserUsersContainer>
                            )})
                            :
                            <h1 style={{textAlign: 'center'}}>No user available</h1>
                        }
                    </UsersContainer> */}
                    <InviteUsersTitle>Note: Type 'all' to load all users</InviteUsersTitle>
                    <UsersContainer>
                        {filteredItems === null ? '' :
                        filteredItems.length > 0 ?
                            filteredItems.map((user, index) => {
                                return (
                                <AddUserUsersContainer key={index} onClick={() => handleAddUser(user.id)}>
                                    <ContentUserProfileContainer>
                                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                            {emailRemover(user.uid).charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ContentUserProfileContainer>
                                    <User>{emailRemover(user.uid).substring(0, 25) + (emailRemover(user.uid).length > 25? '...' : '')}{matchesMD && <ButtonAddUser>Add</ButtonAddUser>}</User>
                                </AddUserUsersContainer>
                            )})
                            :
                            <h1 style={{textAlign: 'center'}}>No user available</h1>
                        }
                    </UsersContainer>
                </Typography>
                </BoxDM>
            </Modal> 
        </>
    )
}

export default AddUserComponent
