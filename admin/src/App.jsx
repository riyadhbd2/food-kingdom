import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom";
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr/>
      <div className='md:flex gap-10'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App