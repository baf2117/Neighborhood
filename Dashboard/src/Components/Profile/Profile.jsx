import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDataProvider, Toolbar } from "react-admin";
import Button from '@material-ui/core/Button';
import { useMediaQuery } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PhoneInput from 'react-phone-number-input'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    myAlert: {
        backgroundColor: '#6D00E6',
        color: 'white',
        fontFamily: 'Gothic',
        borderColor: '#6D00E6'
    },
    myAlertError: {
        color: 'white',
        fontFamily: 'Gothic'
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const { getIdTokenClaims } = useAuth0();
    const [state, setState] = useState();
    const [open, setOpen] = useState(false);
    const [openerror, setOpenerror] = useState(false);
    const dataProvider = useDataProvider();
    var isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const [value, setValue] = useState()

    const onChange = async (props, states) => {
        console.log(props.target.value);
        console.log(props.target.name);
        state[props.target.name] = props.target.value;
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClickError = () => {
        setOpenerror(true);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenerror(false);
    };

    const InfoInput = ({ label, type, value, col, name, readOnly, width }) => {
        var minwidth = width ?? '80%';
        if (!readOnly) {
            return (
                <div class={col ? col : "col-6"}>
                    <div class="row">
                        <div class="col-12">
                            <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{label}</label>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '-0.5em' }} >
                        <div class="col-12">
                            <input type={type} name={name} onChange={(e) => { onChange(e) }} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '2em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} readOnly={readOnly} defaultValue={value} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class={col ? col : "col-6"}>
                    <div class="row">
                        <div class="col-12">
                            <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{label}</label>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '-0.5em' }} >
                        <div class="col-12">
                            <input type={type} name={name} onChange={(e) => { onChange(e) }} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '2em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em', color: '#808080' }} readOnly={readOnly} defaultValue={value} />
                        </div>
                    </div>
                </div>
            );
        }
    }

    const InfoInputText = ({ label, type, value, col, name, readOnly, width }) => {
        var minwidth = width ?? '80%';
        if (!readOnly) {
            return (
                <div class={col ? col : "col-6"}>
                    <div class="row">
                        <div class="col-12">
                            <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{label}</label>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '-0.5em' }} >
                        <div class="col-12">
                            <textarea type={type} name={name} onChange={(e) => { onChange(e) }} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '6em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} readOnly={readOnly} defaultValue={value} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class={col ? col : "col-6"}>
                    <div class="row">
                        <div class="col-12">
                            <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{label}</label>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '-0.5em' }} >
                        <div class="col-12">
                            <textarea type={type} name={name} onChange={(e) => { onChange(e) }} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '6em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em', color: '#808080' }} readOnly={readOnly} defaultValue={value} />
                        </div>
                    </div>
                </div>
            );
        }
    }

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

    if (!state) return null;

    const Update = async () => {
        state.phone = value ? value : state.phone;
        state.lastname = state.lastName;
        dataProvider.update('profile', { id: state.id, data: state })
            .then(response => {
                setState(response.data);
                handleClick();
            })
            .catch((error) => {
                handleClickError();
            })
    }

    return !isSmall ? (
        <div style={{ width: '100%', marginTop: '1em' }}>
            <label style={{ marginLeft: '2.5em', fontFamily: 'Gothic', fontWeight: 'bold', fontSize: '0.85em', color: '#5300E3' }}>Información de la Cuenta</label>
            <div style={{ height: '23em', width: '99%', backgroundColor: 'white', border: '2px solid #EFEFEF', borderRadius: '7px', marginBottom: '2em', marginLeft: '1em' }}>
                <div class="container" style={{}}>
                    <div class="row" style={{ marginTop: '1em' }}>
                        <InfoInput width='100%' type="text" name="name" value={state?.name} label="Nombre" />
                        <InfoInput width='100%' type="text" name="lastName" value={state?.lastName} label="Apellido" />
                    </div>
                    <div class="row" style={{}}>
                        <InfoInput width='100%' type="text" name="email" value={state?.email} label="Correo Electrónico" />
                        <div class="col" style={{ marginBottom: "0%" }}>
                            <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{"Número de teléfono"}</label>
                            <PhoneInput style={{ width: "98%", borderColor: "#EFEFEF", marginLeft: "2%", fontFamily: 'BoldGothic', marginTop: '-1%', fontSize: '0.85em', marginBottom: "0%" }}
                                defaultCountry="GT"
                                placeholder="Ingresa número de teléfono"
                                label="Número telefónico"
                                required name="Phone"
                                value={state?.phone}
                                component="input"
                                onChange={setValue} />
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: '-0.8em' }}>
                        <InfoInputText width="100%" placeholder="Ingresa dirección" label="Direccion" name="address" type="text" value={state?.address} />
                    </div>
                    <div class="row">
                        <InfoInput type="hidden" name="UserId" value={state?.userId} label="" />
                    </div>
                </div>
            </div>
            <div class="row" style={{}}>
                <div class="col-4"></div>
                <div class="col-4">
                    <div style={{ width: '100%', textAlign: 'right', marginBottom: '2em' }}>
                        <Button color="primary" style={{ background: '#5300E3', width: '100%', color: 'white', fontFamily: 'Gothic', textTransform: 'none' }}
                            icon={<noicon />} onClick={Update}>Guardar</Button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" className={classes.myAlert} variant="outlined" >
                            La información de su perfil ha sido actualizada
                        </Alert>
                    </Snackbar>
                </div>
                <div>
                    <Snackbar open={openerror} autoHideDuration={4000} onClose={handleCloseError}>
                        <Alert onClose={handleCloseError} severity="error" className={classes.myAlertError} >
                            La información de su perfil no se ha podido actualizar
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div >
    ) : (
        <div style={{ width: '100%', marginTop: '1em' }}>
            <label style={{ marginLeft: '2.5em', fontFamily: 'Gothic', fontWeight: 'bold', fontSize: '0.85em', color: '#6d00e6' }}>Información de la Cuenta</label>
            <div style={{ height: '28em', width: '100%', backgroundColor: 'white', border: '2px solid #EFEFEF', borderRadius: '7px', marginBottom: '2em' }}>
                <div class="container" style={{}}>
                    <div class="row" style={{ marginTop: '1em' }}>
                        <InfoInput col="col-12" width='100%' type="text" name="name" value={state?.name} label="Nombre" />
                    </div>
                    <div class="row" style={{}}>
                        <InfoInput col="col-12" width='100%' type="text" name="lastName" value={state?.lastName} label="Apellido" />
                    </div>
                    <div class="row">
                        <InfoInput col="col-12" width='100%' type="text" name="email" value={state?.email} label="Correo Electrónico" />
                    </div>
                    <div class="row" style={{}}>
                        <div class="col" style={{ }}>
                            <label style={{ fontFamily: 'Gothic', fontWeight: 'bold', minWidth: '80%', fontSize: '0.85em', height: '2em', paddingLeft: '1em' }}>{"Número de teléfono"}</label>
                            <PhoneInput style={{ width: "98%", borderColor: "#EFEFEF", marginLeft: "2%", fontFamily: 'BoldGothic', marginTop: '-1%', fontSize: '0.85em', marginBottom: "0%" }}
                                defaultCountry="GT"
                                placeholder="Ingresa número de teléfono"
                                label="Número telefónico"
                                required name="Phone"
                                value={state?.phone}
                                component="input"
                                onChange={setValue} />
                        </div>
                    </div>
                    <div class="row" style={{marginTop:'1rem'}}>
                        <InfoInputText col="col-12" width="100%" placeholder="Ingresa dirección" label="Direccion" name="address" type="text" value={state?.address} />
                        <InfoInput type="hidden" name="UserId" value={state?.userId} label="" />
                    </div>
                </div>
            </div>
            <div class="row" style={{}}>
                <div class="col-4"></div>
                <div class="col-4">
                    <div style={{ width: '100%', textAlign: 'right', marginBottom: '2em' }}>
                        <Button color="primary" style={{ background: '#5300E3', width: '100%', color: 'white', fontFamily: 'Gothic', textTransform: 'none' }}
                            icon={<noicon />} onClick={Update}>Guardar</Button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" className={classes.myAlert} variant="outlined" >
                            La información de su perfil ha sido actualizada
                        </Alert>
                    </Snackbar>
                </div>
                <div>
                    <Snackbar open={openerror} autoHideDuration={4000} onClose={handleCloseError}>
                        <Alert onClose={handleCloseError} severity="error" className={classes.myAlertError} >
                            La información de su perfil no se ha podido actualizar
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div >
    )
}

export default Profile;