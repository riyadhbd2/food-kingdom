import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams} from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    // verify payment
    const verifyPayment = async()=>{
        const response = await axios.post(url+"/api/order/verify", {success, orderId});
        if (response.data.success) {
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }

    // run the verify payment function when component loaded
    useEffect(()=>{
        verifyPayment();
    },[])
    
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}

export default Verify