import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';
import {setOtpFunction} from '../Services/Apis';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/mix.css';


const Login = ()=>{

    const [email,setEmail] = useState("");
    const [spinner,setSpinner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.userdbtoken==="qawdemritn"){
            navigate("/admin");
          }
          else if(sessionStorage.userdbtoken==="qfwaecrutlytuy"){
            navigate("/faculty");
          }
          else if(sessionStorage.userdbtoken==="qswteurdteynut"){
            navigate("/student");
          }
      }, []);

    const sendOtp = async (e)=>{
        e.preventDefault();

        if(email === ""){
            toast.error("Enter Your Email !");
        }
        else if(!email.includes("@")){
            toast.error("Enter Valid Email !");
        }
        else if(!email.includes(".")){
            toast.error("Enter Valid Email !");
        }
        else{
            setSpinner(true);
            const data = {
                email:email
            }
            const response = await setOtpFunction(data);
            // console.log(response.status);
            if(response.status===200)
            {
                setSpinner(false)
                toast.success("OTP sent");
                navigate("/otp",{state:email})
            }else{
                setSpinner(false)
                toast.error(response.response.data.error);
            }

        }

    }

    return(
        <>
        <Header></Header>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Minor Project</h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                        </div>
                        <button className='btn' onClick={sendOtp}>Send OTP
                        {
                            spinner?<Spinner animation="border" size="sm" />:""
                        }
                        </button>
                    </form>
                </div>
                <ToastContainer></ToastContainer>
            </section>
        </>
    )
}

export default Login;