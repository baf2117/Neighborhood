import { Layout, MenuItemLink, Responsive } from 'react-admin';
import MyAppBar from './MyAppBar'
import trans from './Components/Commons/Icons/noun_transaction_2182047.svg';
import profile from './Components/Commons/Icons/noun_profile_1543006.svg';
import notification from './Components/Commons/Icons/noun_invoice_3492253.svg';
import shop from './Components/Commons/Img/Logo.png';
import shopicon from './Components/Commons/Img/icono.png';
import { useSelector } from 'react-redux';
import MySidebar from './MySidebar';
import { useAuth0 } from "@auth0/auth0-react";
import logouticon from './Components/Commons/Icons/noun_logout_2035127.svg';
import { useDataProvider } from "react-admin";
import { useEffect, useState } from "react";


import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    active: {
        borderLeft: '3px solid #4f3cc9'
    }
}));


const MyMenu = ({ onMenuClick }) => {
    const { logout } = useAuth0();
    const classes = useStyles();
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    let iconmenu = open ? shop : shopicon;
    let maxHeight = open ? '11em' : '2.5em';
    let maxWidth = open ? '13em' : '2.5em';
    let paddingLeftmax = open ? '1.4em' : '1em';

    const dataProvider = useDataProvider();
    const { getIdTokenClaims } = useAuth0();
    const [admin, setAdmin] = useState(false);
    const menuItems = [
        { name: 'visits', text: 'Visitas', icon: <img src={trans} alt="logo" style={{ maxWidth: '1.3em', maxHeight: '1.3em' }} /> },
        { name: 'notifications', text: 'Notificaciones', icon: <img src={notification} alt="logo" style={{ maxWidth: '1.3em', maxHeight: '1.3em' }} /> },
    ];

    const menuItems2 = [
        { name: 'profilesadmin', text: 'Vecinos', icon: <img src={profile} alt="logo" style={{ maxWidth: '1.5em', maxHeight: '1.5em' }} /> },
        { name: 'visitsadmin', text: 'Visitas', icon: <img src={trans} alt="logo" style={{ maxWidth: '1.5em', maxHeight: '1.5em' }} /> },
        { name: 'notificationsadmin', text: 'Notificaciones', icon: <img src={notification} alt="logo" style={{ maxWidth: '1.5em', maxHeight: '1.5em' }} /> }
    ];

    useEffect(() => {
        (async () => {
            try {
                var claims = await getIdTokenClaims();
                const { data } = await dataProvider.getOne('profile', { id: claims.sub });
                setAdmin(data.admin);
            }
            catch {
            }
        })();
    }, []);

    const onClick = async () => {
        logout();
    }

    return (
        <div>
            <a href="#">
                <img src={iconmenu} alt="logo" style={{ maxWidth: maxWidth, maxHeight: maxHeight, marginTop: '1em', paddingLeft: paddingLeftmax }} />
            </a>

            {menuItems.map(item => (
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

            {admin ? <div>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}><b>Administrador</b></p>
                <hr style={{ borderTop: '3px solid #bbb' }}></hr>
            </div> : null}
            {admin ?
                menuItems2.map(item => (
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
                )) : null}
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