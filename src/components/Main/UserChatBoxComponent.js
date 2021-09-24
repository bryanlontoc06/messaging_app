import {
    UserChatBox,
    UserAvatar
} from './components'

const UserChatBoxComponent = (props) => {
    const {
        initial,
        imgSrc,
        name
    } = props;
    return (
        <>
            <UserChatBox>
                <UserAvatar sx={{ bgcolor: 'green' }} variant="rounded" src={imgSrc}>
                {initial}
                </UserAvatar>
                {name}
            </UserChatBox>
        </>
    )
}

export default UserChatBoxComponent
