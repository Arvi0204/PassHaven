import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from 'react-hot-toast'
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Here you would typically handle the login logic
        console.log('Login attempted with:', credentials);

        const response = await fetch(`http://localhost:2000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            toast.success("Logged in successfully")
        }
        else toast.error("Invalid credentials")
    };
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="flex items-center justify-center p-40">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                        Login to your account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Email address"
                                value={credentials.email}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={onChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div>
                        <div className='mt-3 flex'>
                            <Link
                                to="/signup"
                                role='button'
                                className="mt-5 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-3 py-2 text-center"
                            >
                                Don't have an account? <span className='underline font-bold'>Sign Up now</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}