import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

export default function UserDetails() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        createdAt: "",
        lastLogin: ""
    });
    // Password states
    const [updatedPassword, setUpdatedPassword] = useState({ newPassword: "", confirmNewPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const token = localStorage.getItem("token");
    // Modal states
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:2000/api/auth/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                toast.error("Failed to fetch user details");
            }
        };

        if (token) {
            fetchUserDetails();
        }
    }, [token]);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (updatedPassword.newPassword !== updatedPassword.confirmNewPassword) {
            setPasswordError("Passwords don't match");
            return;
        } else {
            setPasswordError('');
        }
        try {
            const response = await fetch('http://localhost:2000/api/auth/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ newPassword: updatedPassword.newPassword })
            });

            if (response.ok) {
                toast.success("Password changed successfully!");
                setUpdatedPassword({ newPassword: "", confirmNewPassword: "" });
                navigate("/login")
            } else {
                toast.error("Failed to change password");
            }
        } catch (error) {
            toast.error("An error occurred, please try again.");
        }
    };

    const onChange = (e) => {
        setUpdatedPassword({ ...updatedPassword, [e.target.name]: e.target.value })
    }

    const openConfirmModal = (actionType) => {
        if (actionType === 'passwords') {
            setConfirmMessage("Are you sure you want to delete all passwords?");
            setConfirmAction(() => deleteAllPasswords);
        } else if (actionType === 'account') {
            setConfirmMessage("Are you sure you want to delete your account?");
            setConfirmAction(() => deleteAccount);
        }
        setIsConfirmModalOpen(true);
    };

    const deleteAllPasswords = async () => {
        try {
            const response = await fetch('http://localhost:2000/api/passwords/deleteallpass', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json()

            if (json.success) {
                toast.success(json.message);
                setIsConfirmModalOpen(false);
                navigate("/")
            }
        } catch (error) {
            toast.error("An error occurred, please try again.");
        }
        setIsConfirmModalOpen(false);
    };

    const deleteAccount = async () => {
        try {
            const response = await fetch('http://localhost:2000/api/auth/deleteuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
            });
            const json = await response.json()

            if (json.success) {
                toast.success(json.message);
                localStorage.removeItem('token');
                setIsConfirmModalOpen(false);
                navigate("/home")
            }
        } catch (error) {
            toast.error("An error occurred, please try again.");
        }
    };


    return (
        <>
            <h2 className='text-center text-3xl font-bold mt-20'>Welcome, {user.username}</h2>
            <div className="flex-grow flex items-center justify-center p-4 m-10">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">User Info</h2>
                    <div className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {user.username}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {user.email}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Account Created</label>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Login</label>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                                {new Date(user.lastLogin).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <div className="mt-1 relative">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={updatedPassword.newPassword}
                                    onChange={onChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={updatedPassword.confirmNewPassword}
                                    onChange={onChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>
                        {passwordError && <p className="font-bold text-red-500 text-sm">{passwordError}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Danger Zone Section */}
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md m-auto mt-10">
                <h2 className="text-center text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
                <p className="text-gray-600 mb-6">Please proceed with caution. These actions are irreversible.</p>

                <div className="space-y-4">
                    <button
                        onClick={() => openConfirmModal('passwords')}
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete All Passwords
                    </button>
                    <button
                        onClick={() => openConfirmModal('account')}
                        className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmAction}
                message={confirmMessage}
                confirmText="Yes, I'm sure"
            />
        </>
    );
}