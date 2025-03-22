import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom";
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer} from 'react-toastify';

const App = () => {
  const url = `${import.meta.env.VITE_BACKEND_URL}`;
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr/>
      <div className='sm:flex gap-10'>
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App