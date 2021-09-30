import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, AddIcon, UsersContainer, User, ContentChannelTitle } from './components'
import {emailRemover} from '../helpers/helpers'

//Comment
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
    const {openAddChannel, handleCloseChannel, usersList} = props;

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
                        <div>
                            <TextField 
                                id="outlined-basic" 
                                label="Channel Name" 
                                variant="outlined" 
                                size="small" 
                                sx={{
                                    margin: '12px 0px',
                                }} 
                            />
                        </div>
                        <ContentChannelTitle>Invite users to the new channel</ContentChannelTitle>

                        <UsersContainer>
                            {usersList.data?.data.slice(0,20).map((user) => {
                                return (<User key={user.id}>{emailRemover(user.uid)}<AddIcon /></User>)
                            })}
                        </UsersContainer>
                        <Button variant="contained" startIcon={<AddIcon />}>Add Channel</Button>
                    </Box>
                </Fade>
            </Modal> 
        </>
    )
}

export default Index
