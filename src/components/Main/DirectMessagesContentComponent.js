import {UidInputContainer, TextField, UsersContainerDM, AddUserUsersContainer, ContentUserProfileContainer, Avatar, User} from './components'
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { emailRemover } from '../helpers/helpers';

const DirectMessagesContentComponent = (props) => {
    const {
        addUserEmail,
        debounceOnChange,
        filteredItems,
        intervalRetrieveMessagesinUser,
        classes,
        toggleDrawer,
        open,
        filteredItemsAddUsers,
        debounceOnChangeAddUsers
    } = props;
    return (
        <>
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
                    onChange={debounceOnChangeAddUsers}
                    placeholder="Search for a user to DM"
                />
            </UidInputContainer>
            <UsersContainerDM>
                {!open && 
                (filteredItemsAddUsers === null ? '' :
                filteredItemsAddUsers.length > 0 ?
                filteredItemsAddUsers.map((user, index) => {
                        return (
                                <AddUserUsersContainer key={index} onClick={() => {return (intervalRetrieveMessagesinUser(user), toggleDrawer())}}>
                                    <Tooltip title={user.uid} arrow TransitionComponent={Zoom}>
                                        <ContentUserProfileContainer>
                                            <Avatar sx={{ bgcolor: 'green' }} variant="rounded" src="#">
                                                {emailRemover(user.uid).charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ContentUserProfileContainer>
                                    </Tooltip>
                                    <User>{emailRemover(user.uid).substring(0, 20 ) + (emailRemover(user.uid).length > 20? '...' : '')}</User>
                                </AddUserUsersContainer>
                    )})
                    :
                    <h1 style={{textAlign: 'center'}}>No user available</h1>)
                }
            </UsersContainerDM>
        </>
    )
}

export default DirectMessagesContentComponent
