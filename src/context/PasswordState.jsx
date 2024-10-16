import React, { useState } from "react";
import PasswordContext from "./passwordContext";

const PasswordState = (props)=>{
    const passwordInitial = []
    const [passwordArray, setPasswordArray] = useState(passwordInitial);

    return (
        // Using Context API and passing value of state and update function to all components that will use the Context API
        <PasswordContext.Provider value={{passwordArray, setPasswordArray}}>
            {props.children}
        </PasswordContext.Provider>
    )
}
export default PasswordState;