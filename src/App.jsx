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

function App() {

  return (
    <>
      <PasswordState>
        <FormState>
          <Router>
            {/* Container with flexbox layout */}
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow"> {/* This will take remaining space */}
                <Routes>
                  <Route exact path="/" element={<>
                    <PasswordForm />
                    <PasswordTable />
                  </>} />
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
