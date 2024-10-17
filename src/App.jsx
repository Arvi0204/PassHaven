import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import PasswordState from './context/PasswordState'
import PasswordTable from './components/PasswordTable'
import PasswordForm from './components/PasswordForm'
import FormState from './context/FormState'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast';
import Signup from './components/Signup'


function App() {

  return (
    <>
      <PasswordState>
        <FormState>
          <Router>
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
            {/* Container with flexbox layout */}
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow"> {/* This will take remaining space */}
                <Routes>
                  <Route exact path="/" element={<>
                    <PasswordForm />
                    <PasswordTable />
                  </>} />
                  <Route exct path="/login" element={<Login />} />
                  <Route exct path="/signup" element={<Signup />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </FormState>
      </PasswordState>
    </>
  )
}

export default App
