import React, { useEffect } from 'react'
import PasswordForm from './PasswordForm'
import PasswordTable from './PasswordTable'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    let navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [])
  return (
    <div>
      <PasswordForm/>
      <PasswordTable/>
    </div>
  )
}

export default Home
