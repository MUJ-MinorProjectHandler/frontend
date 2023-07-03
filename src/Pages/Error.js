import React, {useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";



const Error = ()=>{
    const navigate = useNavigate();


    useEffect(() => {
        navigate("/");
      }, []);
    

    return(
        <div>Error</div>
    )
};

export default Error;