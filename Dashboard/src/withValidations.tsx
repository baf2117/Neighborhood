import { useAuth0 } from "@auth0/auth0-react";
import { ComponentType, FC, useEffect, useState } from "react";
import { http } from "./https";


const organizationEndpointUri: string = process.env.REACT_APP_ORGANIZATION_ENDPOINT_URI ?? "";

/*
 * Este HOC se usa en la carga inicial del app, y permite
 * obtener información basica de la aplicación.
 */
const domain: string = process.env.REACT_APP_URL ?? "";

const withValidations = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P): JSX.Element => {
    const { isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently, logout } = useAuth0();
    const [canContinue, setCanContinue] = useState<Boolean>(false);
    const [hasError, setHasError] = useState<Boolean>(false);
    const [com, setCom] = useState(<span>Espere...</span>);


    useEffect(() => {
        (async (): Promise<void> => {
            try {
                var claims = await getIdTokenClaims();
                if (!isAuthenticated) {
                    setCom(<div style={{}}><span>Error no estas autenticado</span></div>);
                    return;
                }

                if (!claims.email_verified!) {
                    setCom(<div className="centered"><div className="child"><span>Antes de continuar verifica tu email.</span></div></div>);
                    return;
                }


                try {
                    const lookup = await http<any>(new Request(`${domain}/auth0/${claims.sub}`, {
                        method: 'GET',
                    }));
                }
                catch {
                    setCom(<div className="centered"><div className="child"><span>Estamos pasando por problemas, intente en un momento.</span></div></div>);
                    return;
                }

                setCom(<Component {...props} />);
            } catch (e) {
                setHasError(true);
            }
        })();
    }, []);
    return com;
};

export default withValidations