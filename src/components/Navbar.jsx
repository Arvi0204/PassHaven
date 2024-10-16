import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="container flex justify-between items-center px-4 py-6 h-11 mx-auto">
        <div className="logo font-bold text-2xl">
          <span className='text-blue-500'>&lt;</span>
          Pass
          <span className='text-blue-500'>Haven/&gt;</span>
        </div>
        <ul>
          <li className='flex gap-3'>
            <Link className='hover:font-bold' to="/">Home</Link>
            <Link className='hover:font-bold' to="/genrator">Generator</Link>
            <Link className='hover:font-bold' to="/about">About PassHaven</Link>
          </li>
        </ul>
        <button className="text-white bg-blue-700 rounded-full my-5 flex gap-3 px-2 py-1 justify-between items-center">
          <img src="icons/github-mark-white.png" width={24} alt="github logo" />
          Github
        </button>
      </div>
    </nav>
  )
}

export default Navbar
