import React, { useState } from "react";
import PasswordContext from "./passwordContext";

const PasswordState = (props) => {
    const host = "http://localhost:2000"
    const passwordInitial = []
    const [passwordArray, setPasswordArray] = useState(passwordInitial);

    const getPasswords = async () => {
        try {
            // API CALL
            const response = await fetch(`${host}/api/passwords/fetchallpass`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();

            // Mounting updated notes to react client side
            setPasswordArray(json);
        } catch (error) {
            console.log("Error fetching" + error.message);
        }
    }

    // Add a note
    const addPass = async (url, username, password) => {
        // API CALL
        const response = await fetch(`${host}/api/passwords/addpass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ url, username, password })
        });
        const pass = await response.json();

        setPasswordArray(passwordArray.concat(pass));
    }

    // Edit a note
    const editPass = async (id, url, username, password) => {
        // // API CALL
        const response = await fetch(`${host}/api/passwords/updatepass/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ url, username, password })
        });
        const json = await response.json();

        // Logic to edit in client side
        const newPass = passwordArray.map((pass) => {
            return pass._id === id ? { ...pass, url, username, password } : pass;
        });
        setPasswordArray(newPass);
    }

    // Delete a note
    const deletePass = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/passwords/deletepass/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ id })
        });
    const json = await response.json();

    // Logic to delete in client side
    const newPass = passwordArray.filter((pass) => { return pass._id !== id })
    setPasswordArray(newPass);
}
return (
    // Using Context API and passing value of state and update function to all components that will use the Context API
    <PasswordContext.Provider value={{ passwordArray, setPasswordArray, addPass, getPasswords, editPass, deletePass }}>
        {props.children}
    </PasswordContext.Provider>
)
}
export default PasswordState;