import { Loading, Error, useDataProvider } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { useEffect, useState } from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
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
    },
    root: {
        "& div.react-grid-Container": {
            color: "black",
            textAlign: 'center',
            verticalAlign: 'middle',
            fontFamily: 'Gothic',
            paddingTop: '1em',
            fontSize: '0.85em',
            height: '100%',
            borderCollapse: 'collapse',
            marginLeft: '1rem'
        }
    }
}));

const NeighbornEdit = (props) => {
    const classes = useStyles();
    const [state, setState] = useState({
        checkedActive: false,
        checkedAdmin: false,
    });
    const [open, setOpen] = useState(false);
    const [openerror, setOpenerror] = useState(false);
    const [value, setValue] = useState()

    const dataProvider = useDataProvider();

    var isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const onChange = (props) => {
        console.log(typeof props.target.value);

        state[props.target.name] = props.target.value;
        setState(state);
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

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        (async () => {
            try {
                const { data, loading, error } = await dataProvider.getOne('profilesadmin', { id: props.id });

                if (loading) return <Loading loadingPrimary="Cargando" loadingSecondary="Página está cargando. Espere un segundo" />;
                if (error) return <Error />;
                if (!data) return null;
                data.checkedActive = data.enable;
                data.checkedAdmin = data.admin;
                console.log(data)
                setState(data);
            }
            catch {
                console.log('error')
            }
        })();
    }, []);

    const onChange2 = async (props, states) => {
        console.log(props.target.value);
        console.log(props.target.name);
        state[props.target.name] = props.target.value;
    }

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
                            <input type={type} name={name} onChange={(e) => { onChange2(e) }} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '2em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em' }} readOnly={readOnly} defaultValue={value} />
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
                            <input type={type} name={name} onChange={(e) => { onChange2(e) }} style={{ fontFamily: 'Gothic', border: '2px solid #EFEFEF', borderRadius: '7px', fontWeight: 'bold', minWidth: minwidth, fontSize: '0.85em', height: '2em', paddingInlineStart: '1em', marginBottom: '1em', marginTop: '0em', color: '#808080' }} readOnly={readOnly} defaultValue={value} />
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

    const Update = async () => {
        state.enable = state.checkedActive;
        state.admin = state.checkedAdmin;
        state.phone = value ? value : state.phone;
        state.lastname = state.lastName;
        dataProvider.update('profilesadmin', { id: state.id, data: state })
            .then(response => {
                response.data.checkedActive = response.data.enable;
                response.data.checkedAdmin = response.data.admin;
                setState(response.data);
                handleClick();
            })
            .catch((error) => {
                handleClickError();
            })
    }

    return (
        <div>
            <FormGroup row style={{ marginLeft: "2%", marginTop: '2%' }}>
                <FormControlLabel
                    control={<Switch checked={state.checkedActive} onChange={handleChange} name="checkedActive" />}
                    label="Activar"
                />
                <FormControlLabel
                    control={<Switch checked={state.checkedAdmin} onChange={handleChange} name="checkedAdmin" />}
                    label="Administrador"
                />
            </FormGroup>
            <div style={{ height: '80%', width: '100%', backgroundColor: 'white', border: '2px solid #EFEFEF', borderRadius: '7px', }} >
                {!isSmall ? (
                    <div style={{ marginTop: '1em' }}>
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
                ) : (
                    <div class="container" style={{ marginTop: '1.5em' }}>
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
                )}
            </div>
            <div class="row" style={{ marginTop: '1rem' }}>
                <div class="col-5"></div>
                <div class="col-2" style={{ width: '100%', margin: 0, padding:0}}>
                    <div style={{ width: '100%', margin: 0, padding:0}}>
                        <Button color="primary" style={{background: '#5300E3', width: '100%', color: 'white', fontFamily: 'Gothic', textTransform: 'none' }}
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
        </div>
    );
}

export default NeighbornEdit