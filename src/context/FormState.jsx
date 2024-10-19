import React, { useState } from "react";
import FormContext from "./formContext";

const FormState = (props)=>{
    const formInitial = { url: "", username: "", password: "" };
    const [form, setForm] = useState(formInitial);

    return (
        // Using Context API and passing value of state and update function to all components that will use the Context API
        <FormContext.Provider value={{form, setForm}}>
            {props.children}
        </FormContext.Provider>
    )
}
export default FormState;