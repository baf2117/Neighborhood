import { Layout, MenuItemLink, Responsive } from 'react-admin';
import MyAppBar from './MyAppBar'
import trans from './Components/Commons/Icons/noun_transaction_2182047.svg';
import shop from './Components/Commons/Img/Logo.png';
import shopicon from './Components/Commons/Img/icono.png';
import { useSelector } from 'react-redux';
import MySidebar from './MySidebar';
import { useAuth0 } from "@auth0/auth0-react";
import logouticon from './Components/Commons/Icons/noun_logout_2035127.svg';

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    active: {
        borderLeft: '3px solid #4f3cc9'
    }
}));


const menuItems = [
    { name: 'visits', text: 'Visitas', icon: <img src={trans} alt="logo" style={{ maxWidth: '1.3em', maxHeight: '1.3em' }} /> },
];

const MyMenu = ({ onMenuClick }) => {
    const { logout } = useAuth0();
    const classes = useStyles();
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    let iconmenu = open ? shop : shopicon;
    let maxHeight = open ? '11em' : '2.5em';
    let maxWidth = open ? '13em' : '2.5em';
    let paddingLeftmax = open ? '1.4em' : '1em';

    const onClick = async () => {
        logout();
    }
    
    return (
        <div>
            <a href="#">
                <img src={iconmenu} alt="logo" style={{ maxWidth: maxWidth, maxHeight: maxHeight, marginTop: '1em', paddingLeft: paddingLeftmax }} />
            </a>

            { menuItems.map(item => (
                <MenuItemLink
                    classes={{ active: classes.active }}
                    dense={true}
                    key={item.name}
                    to={`/${item.name}`}
                    primaryText={item.text}
                    leftIcon={item.icon}
                    onClick={onMenuClick}
                    style={{
                        color: '#262150',
                        fontWeight: 'bold',
                        fontSize: '1em',
                        marginTop: '2em',
                        fontFamily: ['Gothic'
                        ].join(','),
                    }}
                />
            ))}
            <MenuItemLink
                dense={true}
                key="Cerrar Sesión"
                to={`/#`}
                primaryText="Cerrar Sesión"
                leftIcon={<img src={logouticon} alt="logo" style={{ maxWidth: '2.2em', maxHeight: '1.5em' }} />}
                onClick={onClick}
                style={{
                    color: '#262150',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    marginTop: '2em',
                    fontFamily: ['Gothic'
                    ].join(','),
                }}
            />
        </div>)
};



const MyLayout = props => <Layout {...props} menu={MyMenu} appBar={MyAppBar} sidebar={MySidebar} />;

export default MyLayout;