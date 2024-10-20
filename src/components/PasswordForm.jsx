import React, { useRef, useContext, useEffect } from "react";
import passwordContext from "../context/passwordContext";
import formContext from "../context/formContext";
import toast from 'react-hot-toast';

const PasswordForm = () => {
    const passwordRef = useRef();
    const ref = useRef();

    let context = useContext(passwordContext);
    const { addPass, getPasswords } = context;

    context = useContext(formContext)
    const { form, setForm } = context;

    const savePassword = async () => {
        await addPass(form.url, form.username, form.password);
        toast.success("Password added successfully")
        setForm({ url: "", username: "", password: "" })
        getPasswords();
    };

    const showPassword = () => {
        if (ref.current.src.includes("icons/hidden.png")) {
            // Logic to change to icon to SHOW and hide password
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
        else {
            // Logic to change icon to HIDE and unhide password
            ref.current.src = "icons/hidden.png";
            passwordRef.current.type = "text";
        }
    };

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="md:container md:mx-auto md:pb-8 md:pt-16 md:px-40">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-blue-500">&lt;</span>
                    Pass
                    <span className="text-blue-700">Haven/&gt;</span>
                </h1>
                <p className="text-blue-800 text-lg text-center">
                    Your secure password manager
                </p>
                <div className="flex flex-col p-4 w-full text-black gap-8 justify-center items-center">
                    <input
                        className="rounded-full border border-blue-600 w-full px-4 py-1"
                        type="text"
                        value={form.url}
                        id="url"
                        name="url"
                        onChange={onChange}
                        placeholder="Enter URL"
                    />
                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input
                            className="flex-grow rounded-full border border-blue-600 px-4 py-1"
                            type="text"
                            value={form.username}
                            aria-invalid="username"
                            name="username"
                            onChange={onChange}
                            placeholder="Enter username"
                            autoComplete="email"
                        />
                        <div className="relative flex-grow">
                            <input
                                className="rounded-full border border-blue-600 w-full px-4 py-1"
                                type="password"
                                ref={(passwordRef)}
                                value={form.password}
                                id="password"
                                name="password"
                                onChange={onChange}
                                placeholder="Enter password"
                                autoComplete="new-password"
                            />
                            <span
                                className="absolute right-2 top-1 cursor-pointer"
                                onClick={showPassword}
                            >
                                <img
                                    ref={ref}
                                    className=""
                                    width={24}
                                    src="icons/eye.png"
                                    alt="show icon"
                                />
                            </span>
                        </div>
                    </div>
                    <button
                        disabled={form.url === "" || form.username === "" || form.password === ""}
                        onClick={savePassword}
                        className={`text-white flex justify-center items-center rounded-full w-fit gap-2 px-3 py-1 
                            ${!form.url || !form.username || !form.password ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'}`}
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#ffffff"
                        />
                        Save Password
                    </button>
                </div>
            </div>
        </>
    )
}

export default PasswordForm
