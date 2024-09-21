import './App.css'
import Protected from './Components/Protected'
import Admin from './pages/Admin'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import ProtectAdmin from './Components/ProtectAdmin'
import { ToastContainer } from 'react-toastify'
import ViewAll from './pages/ViewAll'
import Account from './pages/Acount'
import Cart from './pages/Cart'
import { useEffect, useState } from 'react'
import About_room from './pages/About_room'
import TermsAndConditions from './pages/Terms'
import Policy from './pages/Policy'
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const [path , setPath] = useState(null)
  const dispatch = useDispatch()
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        className='pop-up'
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition: Bounce
        />
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path ='/login' element={<Login/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/rooms' element={<ViewAll setPath={setPath}/>}/>
        <Route path={`/rooms/${path?.id}`} element={<About_room room={path}/>}/>
        <Route path='/terms' element={<TermsAndConditions/>}/>
        <Route path='/policy' element={<Policy/>}/>

        <Route element={<Protected/>}>    
        <Route path='/account' element={<Account/>}/>
        <Route path='/booking' element={<Cart/>}/>
        </Route>
        
        <Route element={<ProtectAdmin/>}>
            <Route path='/admin' element={<Admin/>}/>
        </Route>

       </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
