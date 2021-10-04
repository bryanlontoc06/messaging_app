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
        addUserEmail,
        searchUser,
        getSearchUser,
        users,
        emailRemover,
        intervalRetrieveMessagesinUser,
        debounceDMSearch,
        setQuery,
        filteredItems,
        debounceOnChange,
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
                    Direct message
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
                            // value={searchUser}
                            // onChange={getSearchUser}
                            // onChange={(e) => setQuery(e.target.value)}
                            onChange={debounceOnChange}
                            placeholder="user ID"
                        />
                    </UidInputContainer>
                    <InviteUsersTitle>Note: Type 'all' to load all users</InviteUsersTitle>
                    <UsersContainer>
                        {filteredItems === null ? '' :
                        filteredItems.length > 0 ?
                            filteredItems.map((user, index) => {
                                return (
                                <AddUserUsersContainer key={index} onClick={() => intervalRetrieveMessagesinUser(user)}>
                                    <ContentUserProfileContainer>
                                        <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                            {emailRemover(user.uid).charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ContentUserProfileContainer>
                                    <User>{emailRemover(user.uid).substring(0, 25) + (emailRemover(user.uid).length > 25? '...' : '')}{matchesMD && <ButtonAddUser>message</ButtonAddUser>}</User>
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
