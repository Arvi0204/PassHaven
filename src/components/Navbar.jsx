import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import passwordContext from "../context/passwordContext";
import Generator from "./Generator";

const Navbar = () => {
  let context = useContext(passwordContext)
  let { setPasswordArray } = context;
  let navigate = useNavigate();

  // State to manage modal visibility
  const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false); // New state for generator modal

  const confirmLogout = async () => {
    await setPasswordArray([]);
    sessionStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully!!!")
    setisLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="bg-slate-800 text-white sticky top-0">
        <div className="container flex justify-between items-center px-4 py-6 h-11 mx-auto">
          <div className="logo font-bold text-2xl">
            <span className="text-blue-500">&lt;</span>
            Pass
            <span className="text-blue-500">Haven/&gt;</span>
          </div>
          <ul>
            {!sessionStorage.getItem("token") ? (
              <li>
                <div className="">
                  <Link className="flex gap-3 hover:font-bold" to="/home">
                    <lord-icon
                      src="https://cdn.lordicon.com/wmwqvixz.json"
                      trigger="hover"
                      state="hover-home-1"
                      style={{ "width": "25px", "height": "25px", "filter": "invert(1)" }}>
                    </lord-icon>
                    Home
                  </Link>
                </div>
              </li>
            ) : (
              <li className="flex gap-3">
                <Link className="hover:font-bold" to="/">
                  Passwords
                </Link>
                {/* Generator modal trigger */}
                <span
                  className="hover:font-bold cursor-pointer"
                  onClick={() => setIsGeneratorModalOpen(true)}
                >
                  Generator
                </span>
                <Link className="hover:font-bold" to="/about">
                  FAQ's
                </Link>
              </li>
            )}
          </ul>
          {!sessionStorage.getItem("token") ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                setisLogoutModalOpen(true);
              }}
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center"
            >
              Logout
            </button>
          )}
          {/* <button className="text-white bg-blue-700 rounded-full my-5 flex gap-3 px-2 py-1 justify-between items-center" onClick={redirect}>
          <img src="icons/github-mark-white.png" width={24} alt="github logo" />
          Github
          </button> */}
        </div>
      </nav>
      {/* Modal for confirmation */}
      {isLogoutModalOpen && (
        <div
          id="deleteModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md h-auto">
            {/* Modal content */}
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                onClick={() => { setisLogoutModalOpen(false) }} // Close modal
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => { setisLogoutModalOpen(false); }} // Close modal
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={confirmLogout} // Confirm logout
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div >
      )}
      {/* Generator Modal */}
      {isGeneratorModalOpen && (
        <div
          id="generatorModal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="relative p-6 w-full max-w-2xl h-fit mx-auto">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 w-full h-full p-8">
              <button
                type="button"
                className="text-gray-400 absolute top-3 right-3 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
                onClick={() => setIsGeneratorModalOpen(false)} // Close modal
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <Generator setIsGeneratorModalOpen={setIsGeneratorModalOpen}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
