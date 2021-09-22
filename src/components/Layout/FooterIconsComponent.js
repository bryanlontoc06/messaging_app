import {
    FooterIconsNLabelsItem,
    FooterLabels
} from './components'

const FooterIconsComponent = (props) => {
    const {icons, labels, filledIcons, activeMenu, index} = props;
    return (
        <>
            <FooterIconsNLabelsItem active={activeMenu === index}>
                {activeMenu === index ? filledIcons : icons}
                <FooterLabels>{labels}</FooterLabels>
            </FooterIconsNLabelsItem>
        </>
    )
}

export default FooterIconsComponent
