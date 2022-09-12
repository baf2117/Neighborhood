import React, { FC, PropsWithChildren, ReactNode, useCallback, useState } from "react"
import { Form, Field } from 'react-final-form';
import {
    Typography,
    Grid,
    Button,
    Input,
    InputLabel
} from '@material-ui/core';
import {
    TextField
} from 'mui-rff';
import { http } from "./https";
import { FORM_ERROR } from 'final-form'

//Lookup

const domain: string = process.env.REACT_APP_URL ?? "";

const InvoiceEnrollment: FC<{ userId: string }> = ({ userId }) => {
    var isValidating = true;
    const [state, setState] = useState<any>();
    const onSubmit = async (values: any) => {
        // Obtengo los endpoints
        // var token = await state.user?.getAccessToken();
        // no enviar el usuario, que el api lo obtenga del token
        if (isValidating) {
            setState(null);
            try {
                const lookup = await http<any>(new Request(`${domain}/tax/${values.taxId}`, {
                    method: 'GET',
                    // headers: {
                    //     'Authorization': `Bearer ${token}`
                    // }
                }));

                setState({ ...lookup, businessName: values.businessName });
            }
            catch {
                return { taxId: 'Unknown TaxId' }
            }
        } else {
            alert('submit');
        }
    }

    const handleChange = (v1:any, v2:any, v3:any) => {
        console.log(v1, v2, v3);
        setState(null);
    };

    const save = async () => {
        try {
            await http<any>(new Request(`${domain}/profile`, {
                method: 'PUT',
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // }
                body: JSON.stringify({ userId: userId, taxId: state.taxId, businessName: state.businessName })
            }));
            window.location.reload();
        }
        catch {
            return { taxId: 'Unknown TaxId' }
        }
    }

    return (
        <div className="centered">
            <h2>Tax information</h2>
            <Form onSubmit={onSubmit}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form id="form" onSubmit={handleSubmit} noValidate>
                        <Field name="taxId" validate={handleChange}>
                            {({ props, input, meta }) => (
                                <>
                                    <TextField
                                        label="TaxId"
                                        name="taxId"
                                        margin="none"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: 'right' }
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </Field>
                        <TextField
                            label="Business Name"
                            name="businessName"
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right' }
                                }
                            }}
                        />
                        <TextField
                            label="Name"
                            name="name"
                            margin="none"
                            disabled={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right' }
                                }
                            }}
                            value={state ? state!.name : ""}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            margin="none"
                            disabled={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right' }
                                }
                            }}
                            value={state ? state!.address : ""}
                        />
                        <TextField
                            label="Country"
                            name="country"
                            margin="none"
                            disabled={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right' }
                                }
                            }}
                            value={state ? state!.country : ""}
                        />
                        <TextField
                            label="City"
                            name="city"
                            margin="none"
                            disabled={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right' }
                                }
                            }}
                            value={state ? state!.city : ""}
                        />
                        <TextField
                            label="State"
                            name="state"
                            margin="none"
                            disabled={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: 'right' }
                                }
                            }}
                            value={state ? state!.state : ""}
                        />

                        <Button type="submit" form="form" autoFocus color="primary" disabled={submitting}>{
                            submitting ? "Validando..." : "Validar"
                        }</Button>

                        {state ? <Button form="form" autoFocus color="primary" onClick={() => save()}>Continuar</Button> : <></>}
                    </form>
                )}
            />
        </div>
    )
}

export default InvoiceEnrollment;