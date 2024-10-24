import React, { useEffect, useContext, useState } from 'react';
import PasswordContext from "../context/passwordContext";
import toast from 'react-hot-toast';
import formContext from '../context/formContext';
import { useNavigate } from 'react-router-dom';

const PasswordTable = () => {
    const { passwordArray, getPasswords, deletePass } = useContext(PasswordContext);
    const { setForm } = useContext(formContext);

    const [visiblePasswords, setVisiblePasswords] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            getPasswords();
        }
    }, []);

    const copyText = (text, type) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${type} to clipboard`);
    };

    const deletePassword = (id) => {
        deletePass(id);
        toast.success("Password deleted successfully");
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item._id === id);
        if (passwordToEdit) {
            setForm(passwordToEdit);
            deletePass(id);
            toast.loading("Editing password", { duration: 1500 });
        }
    };

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords(prevState => ({ ...prevState, [id]: !prevState[id] }));
    };

    return (
        <div className="md:container md:mx-auto md:px-40 px-20">
            <h1 className="text-blue-600 font-bold text-3xl underline text-center py-5">Your Passwords</h1>
            {passwordArray.length === 0 ? (
                <div>No Passwords to show</div>
            ) : (
                <table className="table-auto w-full overflow-hidden rounded-lg mx-auto">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="py-2 px-4 border-2 border-black text-center">URL</th>
                            <th className="py-2 px-4 border-2 border-black text-center">Username</th>
                            <th className="py-2 px-4 border-2 border-black text-center">Password</th>
                            <th className="py-2 px-4 border-2 border-black text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-blue-100">
                        {passwordArray.map((item) => {
                            const url = item.url.startsWith("http://") || item.url.startsWith("https://") ? item.url : `https://${item.url}`;
                            const isPasswordVisible = visiblePasswords[item._id];

                            return (
                                <tr key={item._id}>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center">
                                            <a href={url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                                        </div>
                                    </td>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center">
                                            <span>{item.username}</span>
                                            <span className='cursor-pointer' onClick={() => copyText(item.username, "username")}>
                                                <img src="icons/copy.gif" alt="Copy username" width={32} />
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center">
                                            <span>{isPasswordVisible ? item.password : '*'.repeat(item.password.length)}</span>
                                            <div className='cursor-pointer ml-5' onClick={() => copyText(item.password, "password")}>
                                                <img src="icons/copy.gif" alt="Copy password" width={32} />
                                            </div>
                                            <div className='cursor-pointer' onClick={() => togglePasswordVisibility(item._id)}>
                                                <img src={isPasswordVisible ? "icons/hidden.png" : "icons/eye.png"} alt="Toggle visibility" width={24} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 border-2 border-black text-center">
                                        <div className="flex justify-center items-center gap-3">
                                            <img className='cursor-pointer' src="icons/edit.gif" alt="Edit password" width={32} onClick={() => editPassword(item._id)} />
                                            <img className='cursor-pointer' src="icons/trash-bin.gif" alt="Delete password" width={32} onClick={() => deletePassword(item._id)} />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PasswordTable;
