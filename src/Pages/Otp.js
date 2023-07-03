import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {setOtpFunction} from '../Services/Apis';
import Header from "../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import { userVerify } from "../Services/Apis";
import Spinner from "react-bootstrap/Spinner";
import "../styles/mix.css";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const location = useLocation();
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


  const login = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Enter Your Otp");
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp");
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit");
    } else {
      setSpinner(true);
      const data = { otp, email: location.state };
      const response = await userVerify(data);
      if (response.status === 200) {
        sessionStorage.setItem("userdbtoken", response.data.userToken);
        sessionStorage.setItem("email", location.state);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/admin");
        }, 5000);
      } else if (response.status === 201) {
        sessionStorage.setItem("userdbtoken", response.data.userToken);
        sessionStorage.setItem("email", location.state);

        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/faculty", { state: data });
        }, 5000);
      } else if(response.status === 202){
        sessionStorage.setItem("userdbtoken", response.data.userToken);
        sessionStorage.setItem("email", location.state);

        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/student", { state: data });
        }, 5000);
      }else {
        setSpinner(false);
        toast.error(response.response.data.error);
      }
    }
  };

  const resendOTP = async () => {
    setSeconds(30);
    const data = {
        email:location.state
    }
    const response = await setOtpFunction(data);
    console.log(response);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <>
      <Header></Header>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Minor Project</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">Otp</label>
              <input
                type="text"
                name="otp"
                id=""
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter The Otp you recieved"
              />
            </div>
            <button className="btn" onClick={login}>
              Login
              {spinner ? <Spinner animation="border" size="sm" /> : ""}
            </button>
            <div className="resendotp">
              {seconds > 0 ? (
                <p>Time Remaining: {seconds < 10 ? `0${seconds}` : seconds}</p>
              ) : (
                <p>Didn't recieve code?</p>
              )}

              <button
                disabled={seconds > 0}
                style={{
                  color: seconds > 0 ? "#DFE3E8" : "#FF5630",
                }}
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
        <ToastContainer></ToastContainer>
      </section>
    </>
  );
};
export default Otp;
