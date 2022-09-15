import { Create, FormWithRedirect, Toolbar, SaveButton } from 'react-admin';
import { Box } from '@material-ui/core';
import InputFieldCustom from '../Commons/InputFieldCustom'
import { useLayoutEffect, useState } from "react";
import { useMediaQuery } from '@material-ui/core';
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

const NotificationCreate = (props) => {
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
        <Create {...props}>
            <FormWithRedirect {...props}
                render={formProps => (
                    <form>
                        {!isSmall ? (
                            <div class="container">
                                <div class="row">
                                    <InputFieldCustom placeholder="Ingrese la Notificación" label="Notificación" required name="description" type="textarea" component="input" onChange={onChange} />
                                </div>
                            </div>
                        ) : (<div class="container">
                            <div class="row">
                                <InputFieldCustom col='col-12' placeholder="Ingrese la Notificación" label="Notificación" required name="description" type="textarea" component="input" onChange={onChange} />
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

export default NotificationCreate