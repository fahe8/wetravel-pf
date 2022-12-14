import React, { useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const messageBaned = () => {
    toast.error('Usted a sido baneado', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    
function Baned() {
    
    useEffect(() => {
        messageBaned()
        setTimeout(() => {
            window.location.href = "http://localhost:3000/"
        }, 6000);
    }, [])

    return (
    <> 
    <ToastContainer/>
    </>    
  )
}

export default Baned