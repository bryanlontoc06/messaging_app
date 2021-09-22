import styled from 'styled-components'
import {BsPencilSquare} from 'react-icons/bs'
import MaterialHomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MaterialHomeIcon from '@mui/icons-material/Home';
import MaterialForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import MaterialForumIcon from '@mui/icons-material/Forum';
import MaterialSearchIcon from '@mui/icons-material/Search';
import MaterialAccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MaterialAccountCircleIcon from '@mui/icons-material/AccountCircle';
import MaterialRecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import MaterialRecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import {
    Link as RouterLink,
  } from "react-router-dom";

export const Header = styled.div `
    padding: 0.75rem 0.9375rem;
    height: 3.4375rem; 
    background: #450a44; 
    display: flex; 
    gap: 1rem;
`
export const LogoContainer = styled.img `
    border-radius: 10px;
    border: 5px solid #b53c36;
`
export const HeaderTitle = styled.span`
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
`

export const PencilSquare = styled(BsPencilSquare)`
    font-size: 1.3rem;
`
export const Footer = styled.div `
    padding: 0.75rem 0.9375rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e6e6e6;
    position: fixed;
    z-index: 999;
    bottom: 0;
    justify-content: space-between;
    flex-direction: column;
    right: 0;
    left: 0;
`
export const FooterIcons = styled.div `
    display: flex;
    justify-content: space-between;
`
export const FooterIconsNLabelsItem = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => props.active ? '#000' : "#606060" }
`
export const Labels = styled.span ``
export const FooterLabels = styled(Labels) ``

export const Link = styled(RouterLink) `
  text-decoration: none;
  color: unset;
`
export const HomeIcon = styled(MaterialHomeOutlinedIcon) `` 
export const FilledHomeIcon = styled(MaterialHomeIcon) ``
export const ForumOutlinedIcon = styled(MaterialForumOutlinedIcon) ``
export const FilledForumIcon = styled(MaterialForumIcon) ``
export const RecordVoiceOverOutlinedIcon = styled(MaterialRecordVoiceOverOutlinedIcon) ``
export const FilledRecordVoiceOverIcon = styled(MaterialRecordVoiceOverIcon) ``
export const SearchIcon = styled(MaterialSearchIcon) ``
export const AccountCircleOutlinedIcon = styled(MaterialAccountCircleOutlinedIcon) ``
export const FilledAccountCircleIcon = styled(MaterialAccountCircleIcon) ``