import { Create, FormWithRedirect, Toolbar, SaveButton } from 'react-admin';
import { Box } from '@material-ui/core';
import InputFieldCustom from '../Commons/InputFieldCustom'
import { useSelector } from 'react-redux';
import { useLayoutEffect, useState } from "react";
import { useMediaQuery } from '@material-ui/core';
import PhoneInput from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function useMediaQueryWidth() {
    const [screenSize, setScreenSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateScreenSize() {
            setScreenSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return screenSize;
}

const VisitsCreate = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [state, setState] = useState({});
    const [country, setCountry] = useState('GT');
    const [countryCode, setCountryCode] = useState('+502');
    const [value, setValue] = useState('');

    const onChange = (props) => {
        state[props.target.name] = props.target.value;
        setState(state);
    }

    const transform = (record) => {
        return {
            ...record,
            Phone: value,
            Country: country,
            CountryCode: countryCode
        }
    }

    const handleOnChange = (value, data, event, formattedValue) => {
        try {
            var countryval = parsePhoneNumber(value);
            if (countryval) {
                setCountryCode("+" + countryval.countryCallingCode);
                setCountry(countryval.country);
            }
        } catch {

        }
        setValue(value);
    }

    return (
        <Create successMessage="Link enviado exitosamente"  {...props}>
            <FormWithRedirect {...props}
                render={formProps => (
                    <form>
                        {!isSmall ? (
                            <div class="container">
                                <div class="row">
                                    <InputFieldCustom placeholder="Ingresa nombre de la visita" label="Visita" required name="Name" type="text" component="input" onChange={onChange} />
                                    <InputFieldCustom placeholder="Ingresa el dpi de la visita" label="DPI" required name="DPI" type="text" component="input" />
                                </div>
                                <div class="row">
                                    <InputFieldCustom label="Fecha" required name="Date" type="date" component="input" />
                                    <div class="col-6">
                                        <label style={{ fontFamily: 'BoldGothic', fontWeight: 1000, color: '#1c1855', paddingLeft: '1em', fontSize: '0.85em', minWidth: "100%", borderColor: "white", marginTop: "5%" }}>{"Número de teléfono"}</label>
                                        <PhoneInput style={{ width: "78%", height: "2em", color: '#1c1855', borderColor: "white", marginLeft: "2%", fontFamily: 'BoldGothic' }}
                                            international
                                            defaultCountry="GT"
                                            country="US"
                                            placeholder="Ingresa número de teléfono"
                                            label="Número telefónico"
                                            required name="BillingPhone"
                                            value="+502"
                                            component="input"
                                            onChange={handleOnChange} />
                                    </div>
                                </div>
                            </div>
                        ) : (<div class="container">
                            <div class="row">
                                <InputFieldCustom col="col-12" width="100%" placeholder="Ingresa número de nit" label="Número de NIT" required name="BillingTaxId" type="text" component="input" nit />
                            </div>
                            <div class="row">
                                <InputFieldCustom col="col-12" width="100%" placeholder="Ingresa correo electrónico de facturación" label="Correo electrónico" required name="BillingEmail" type="text" component="input" email />
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <label style={{ fontFamily: 'BoldGothic', fontWeight: 1000, color: '#1c1855', paddingLeft: '1em', fontSize: '0.85em', minWidth: "100%", borderColor: "white", marginTop: "5%" }}>{"Número de teléfono"}</label>
                                    <PhoneInput style={{ width: "208%", height: "2em", color: '#1c1855', borderColor: "white", marginLeft: "2%", fontFamily: 'BoldGothic' }}
                                        international
                                        defaultCountry="GT"
                                        placeholder="Ingresa número de teléfono"
                                        label="Número telefónico"
                                        required name="Phone"
                                        value="+502"
                                        component="input"
                                        onChange={handleOnChange} />
                                </div>
                            </div>
                            <div class="row">
                                <InputFieldCustom col="col-12" width="100%" placeholder="Ingresa ciudad de facturación" label="Ciudad" required name="BillingAddressCity" type="text" component="input" />
                            </div>
                            <div class="row">
                                <InputFieldCustom col="col-12" width="100%" placeholder="Ingresa dirección de facturación" label="Dirección" name="BillingAddress" type="text" component="input" />
                            </div>
                        </div>)
                        }
                        <Toolbar>
                            <Box display="flex" justifyContent="center" width="100%">
                                <SaveButton
                                    style={{ background: '#5300E3', fontFamily: 'Gothic', marginLeft: '10px', textTransform: 'none', width: '25%' }}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                    transform={transform}
                                    label={'Crear'}
                                    icon={<noicon />}
                                />
                            </Box>
                        </Toolbar>
                    </form>
                )}
            />
        </Create>
    )
}

export default VisitsCreate