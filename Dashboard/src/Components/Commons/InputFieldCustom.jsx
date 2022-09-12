import { Field } from 'react-final-form';
import { useState } from "react";

const phone = /\d*/g;


const InputFieldCustom = ({ placeholder, label, required, name, type, component, number, readOnly, col, width, value }) => {
    const [bordercolor, setbordercolor] = useState("#EFEFEF");
    const mustBeNumberRequired = value => (!value ? 'Requerido' : !validatephone(value) ? 'Valor inválido' : undefined);
    const mustBeNumber = value => (!validatephone(value) ? 'Valor inválido' : undefined);
    const requiredval = value => (value ? undefined : 'Requerido');

    function validatephone(number) {
        const array = [...number.matchAll(phone)];
        if (array.length > 2)
            return false;

        if (array[0][0] === "")
            return false;

        return true;
    }

    let validation = number && required ? mustBeNumberRequired :  number ? mustBeNumber : required ? requiredval : null;

    return (
        <div class={col ? col : "col-6"}>
            <div class="row" style={{ paddingTop: '1.2em', textAlign: 'left' }}>
                <div class="col-12">
                    <label style={{ fontFamily: 'BoldGothic', fontWeight: 1000, color: '#1c1855', paddingLeft: '1em', fontSize: '0.85em', minWidth: "100%", borderColor: "white" }}>{label}</label>
                </div>
            </div>
            <div class="row" style={{ marginTop: '-0.5em' }}>
                <div class="col-12">
                    <Field name={name} component={component} validate={validation}>
                        {({ input, meta }) => {

                            if (meta.error && meta.touched) {
                                setbordercolor("red");
                            } else {
                                setbordercolor("#EFEFEF");
                            }

                            if (component === "textarea") {
                                return (
                                    <textarea {...input} type={type} placeholder={placeholder} style={{ fontFamily: 'Gothic', border: '2px solid', borderColor: bordercolor, borderRadius: '7px', fontWeight: 'bold', width: width ? width : '80%', fontSize: '0.85em', minHeight: '5em', paddingInlineStart: '1em' }} placeholderTextColor='red' readOnly={readOnly} />
                                )
                            }

                            return (
                                <input {...input} type={type} placeholder={placeholder} style={{ fontFamily: 'Gothic', border: '2px solid', borderColor: bordercolor, borderRadius: '7px', fontWeight: 'bold', width: width ? width : '80%', fontSize: '0.85em', height: '2.7em', paddingInlineStart: '1em' }} placeholderTextColor='red' readOnly={readOnly} value={value ? value : input.value} />
                            )
                        }}
                    </Field>
                </div>
            </div >
        </div >
    );
};

export default InputFieldCustom;