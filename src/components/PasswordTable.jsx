import React, { useEffect, useContext } from 'react'
import passwordContext from "../context/passwordContext";

import toast, { Toaster } from 'react-hot-toast';
import formContext from '../context/formContext';


const PasswordTable = () => {
    let context = useContext(passwordContext);
    const { passwordArray, setPasswordArray } = context;
    context = useContext(formContext);
    const {setForm} = context;

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
        else setPasswordArray([]);
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard")
    }

    const deletePassword = (id) => {
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        toast.success("Password deleted successfully")
    }
    const editPassword = (id) => {
        console.log("Editing password with id " + id)
        // Populating form values with existing values
        setForm(passwordArray.filter(item => item.id === id)[0]);
        // Removing the values from password array to avoid duplication
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={true}
                gutter={8}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
            <div className="md:container md:mx-auto md:px-40">
                <h1 className="text-blue-600 font-bold text-3xl underline text-center py-5">Your Passwords</h1>
                {passwordArray.length === 0 && <div> No Passwords to show </div>}
                {passwordArray.length !== 0 && <table className="table-auto w-full overflow-hidden rounded-lg mx-auto">
                    <thead className=" bg-blue-800 text-white ">
                        <tr>
                            <th className="py-2 px-4 border-2 border-black text-center">URL</th>
                            <th className="py-2 px-4 border-2 border-black text-center">Username</th>
                            <th className="py-2 px-4 border-2 border-black text-center">Password</th>
                            <th className="py-2 px-4 border-2 border-black text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-blue-100">
                        {passwordArray.map((item, index) => {
                            const url = item.site.startsWith("http://") || item.site.startsWith("https://") ? item.site : `https://${item.site}`;
                            return (
                                <tr key={index}>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center">
                                            <a href={url} target="_blank">{item.site}</a>
                                        </div>
                                    </td>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center">
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <img src="icons/copy.gif" alt="" width={32} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center">
                                            <span>{item.password}</span>
                                            <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <img src="icons/copy.gif" alt="" width={32} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center gap-3">
                                            <img className='cursor-pointer' src="icons/edit.gif" alt="" width={32} onClick={() => { editPassword(item.id) }} />
                                            <img className='cursor-pointer' src="icons/trash-bin.gif" alt="" width={32} onClick={() => { deletePassword(item.id) }} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default PasswordTable
