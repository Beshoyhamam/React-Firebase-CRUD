import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home.jsx"
import AddEditUser from "./pages/AddEditUser/AddEditUser.jsx"
import Navbar from './components/Navbar/Navbar.jsx'

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path='/add' element={<AddEditUser />} />
                <Route path='/update/:id' element={<AddEditUser />} />
            </Routes>
            <div className='footer'>
                <p>Copyright © 2024 All rights reserved Coding By &#128151; Beshoy Hamam</p>
            </div>
        </div>
    )
}

export default App
