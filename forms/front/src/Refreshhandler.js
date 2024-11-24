import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function Refreshhandler({setIsAuthenticated}) {
    const location= useLocation();
    const navigate= useNavigate();

    useEffect(()=>{
     if(localStorage.getItem('token')){
        setIsAuthenticated(true);
        if(location.pathname==='/' || location.pathname==='/signup'){
            navigate('/home',{replace: false})
        }
     }

    },[location, navigate, setIsAuthenticated])
  return (
null
  )
}

export default Refreshhandler


