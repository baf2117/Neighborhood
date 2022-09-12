import { useAuth0 } from "@auth0/auth0-react";
import { UserMenu, MenuItemLink } from 'react-admin';
import { useEffect, useState } from "react";
import shopicon from './Components/Commons/Img/icono.png';
import perfil from './Components/Commons/Icons/noun_profile_1543006.svg';
import { useDataProvider } from "react-admin";


const MyUserMenuView = (props) => {
    const dataProvider = useDataProvider();
    const { getIdTokenClaims } = useAuth0();
    const [state, setState] = useState({});

    useEffect(() => {
        (async () => {
            try {
                var claims = await getIdTokenClaims();
                const { data } = await dataProvider.getOne('profile', { id: claims.sub });
                setState(data);
            }
            catch {
            }
        })();
    }, []);

    return !state.enable ? (
        <div class="row">
            <div class="col-6" style={{ fontFamily: 'Gothic', color:"red", marginTop:"0.9rem" }} >
                <h6>Inactivo</h6>
            </div>
            <div class="col-6">
                <UserMenu label={state?.businessName} icon={<img src={shopicon} alt="logo" style={{ maxWidth: '1em', maxHeight: '1em' }} />} >
                    <MenuItemLink
                        to="/profile"
                        primaryText="Perfil"
                        leftIcon={<img src={perfil} alt={state?.businessName} style={{ maxWidth: '1.5em', maxHeight: '1.5em' }} />}
                        style={{ fontFamily: 'Gothic' }}
                    />
                </UserMenu>
            </div>
        </div>
    ) : (<div class="row">
        <div class="col-12">
            <UserMenu label={state?.businessName} icon={<img src={shopicon} alt="logo" style={{ maxWidth: '1em', maxHeight: '1em' }} />} >
                <MenuItemLink
                    to="/profile"
                    primaryText="Perfil"
                    leftIcon={<img src={perfil} alt={state?.businessName} style={{ maxWidth: '1.5em', maxHeight: '1.5em' }} />}
                    style={{ fontFamily: 'Gothic' }}
                />
            </UserMenu>
        </div>
    </div>);
}

export default MyUserMenuView;
