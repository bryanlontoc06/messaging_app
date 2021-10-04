import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, AddIcon, UsersContainer, User, InviteUsersTitle, ContentContainer, AddUserUsersContainer, ContentUserProfileContainer, ButtonAddUser, Avatar} from './components'
import debounce from 'lodash'
import {emailRemover} from '../helpers/helpers'
import { useState } from 'react'

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
    const {openAddChannel, handleCloseChannel, createAChannel, channelName, inputUsers, usersList} = props; 
    const [query, setQuery] = useState('');
    const getFilteredItems = (query, usersList) => {
        if(!query) {
            return usersList.data?.data;
        }
        return usersList.data?.data.filter((user) => user.uid.includes(query));
    }

    const filteredItems = getFilteredItems(query, usersList);
    const updateQuery = (e) => setQuery(e?.target?.value);
    const handleSearchUser = debounce(updateQuery, 500);

    return (
        <>
           <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddChannel}
                onClose={handleCloseChannel}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openAddChannel}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                        Create a Channel
                        </Typography>
                        <form>
                            <InviteUsersTitle>Channel Name</InviteUsersTitle>
                            <ContentContainer>
                                <TextField 
                                    id="outlined-basic" 
                                    label="e.g Work Channel" 
                                    variant="outlined" 
                                    size="small" 
                                    sx={{margin: '12px 0px',}} 
                                    inputRef={channelName}
                                />
                            </ContentContainer>
                            <InviteUsersTitle>Invite users to the new channel</InviteUsersTitle>
                                <TextField
                                    id="outlined-basic" 
                                    label="Search for users to invite" 
                                    variant="outlined" 
                                    size="small" 
                                    sx={{margin: '12px 0px',}} 
                                    inputRef={inputUsers}
                                    onChange={handleSearchUser}
                                />
                            <UsersContainer>
                                {filteredItems.length > 0 ?
                                    filteredItems.map((user, index) => {
                                        return (
                                            <AddUserUsersContainer key={index}>
                                                <ContentUserProfileContainer>
                                                    <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                                        {user.uid.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                </ContentUserProfileContainer>
                                                <User>{user.uid.substring(0,25) + (user.id.length > 25 ? '...' : '')}</User>
                                                <ButtonAddUser onClick={() => inputUsers.push(user.id)}><AddIcon /></ButtonAddUser>
                                            </AddUserUsersContainer>
                                        )
                                    })
                                    : <h3> No users available </h3>
                                }
                            </UsersContainer>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={createAChannel}>Add Channel</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal> 
        </>
    )
}

export default Index
