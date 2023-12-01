import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLoginStudent from "../Components/HeaderLoginStudent";
import {
  getFacultyInfo,
  getFacultyFullInfo,
  generateRequest,
  studentStatus,
  getLink,
} from "../Services/Apis";
import { confirmAlert } from "react-confirm-alert";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap";
import "../styles/mix.css";

const Student = () => {
  const [stuInfo, setStuInfo] = useState();
  const [facInfo, setFacInfo] = useState();
  const [facFullInfo, setFacFullInfo] = useState();
  const [link,setLink] = useState();
  const navigate = useNavigate();
  let index=0;

  const sendRequest = async (data) => {
    const Data = {
      semail: sessionStorage.getItem("email"),
      femail: data.email,
    };
    if(Data){
    confirmAlert({
        title: "Confirm to request",
        message: "Are you sure want to request to "+data.name+"?",
        buttons: [
          {
            label: "Yes",
            onClick: ()=> {
              const response = generateRequest(Data);
              console.log(response.status)
              if(response.status===204){
                toast.success("Request generated!")
              }
              if(response.status===401){
                toast.error("Session Timeout!Please reload")
                console.log(response.status)
              }
              else if(response.status===404){
                toast.error("Session Timeout!")
              }}
          },
          {
            label: "No",
            onClick: () =>  {}
          },
        ],
      });}
  };

  // const sendRequestFinal = async ()=>{
  //   console.log(reqSend);
  //   const response = generateRequest(reqSend);
  //   console.log(response.status)
  //   if(response.status===204){
  //     toast.success("Request generated!")
  //   }
  //   if(response.status===401){
  //     toast.error("Session Timeout!Please reload")
  //     console.log(response.status)
  //   }
  //   else if(response.status===404){
  //     toast.error("Session Timeout!")
  //   }
     
    
  // }
  const facinfo = async () => {
    const response = await getFacultyInfo();
    setFacInfo(response.data);
  };

  const facfullinfo = async () => {
    const response = await getFacultyFullInfo();
    setFacFullInfo(response.data);
  };

  const checkStatus = async () => {
    const response = await studentStatus();
    setStuInfo(response.data);
    // if (stuInfo) {
    //   console.log(stuInfo);
    // }
  };

  const getProblemStatements = async () => {
    const response = await getLink();
    setLink(response.data);
  }


  useEffect(() => {
    getProblemStatements();
    facinfo();
    facfullinfo();
    
    if(sessionStorage.userdbtoken==="qswteurdteynut"){}
    else{
      sessionStorage.clear();
      navigate("/");
    }
  }, []);

  useEffect(()=>{
    
    checkStatus();
  })

  switch (stuInfo?.status ?? null) {
    case "pending":
      return (
        <>
          <HeaderLoginStudent></HeaderLoginStudent>
          <>
            <h3 className="studentheading">
              ** First have a conversation with respective faculty. Since students can request only 1 faculty at a time.
            </h3>
            {/* <h3 className="studentheading">
              Click on the request button who you want to work under
            </h3> */}
            <div className="text-center" style={{ marginBottom:"3rem"}}>
            <button
                type="button"
                class="btn btn-success"
                className="downsheet"
                target="_blank"
                href={link}
                style={{fontSize:"15px"}}
              >
                View Problem Statements
              </button>
              </div>
            <div className="container-fluid">
              {facInfo?.map((FACULTY1) => (
                <ListGroup
                  key={FACULTY1.id}
                  horizontal="sm"
                  className="my-2 studentlist d-flex justify-content-center"
                >
                  <ListGroup.Item>{++index}</ListGroup.Item>
                  <ListGroup.Item>{FACULTY1.name}</ListGroup.Item>
                  <ListGroup.Item>{FACULTY1.email}</ListGroup.Item>
                  <ListGroup.Item>
                  {FACULTY1.description_link==="_description_link_"?<p style={{marginBottom:"0rem"}}>No Link</p>:
                    <a href={FACULTY1.description_link} target="_blank" rel="noreferrer">Link</a>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <button className="requestbtn" onClick={() => sendRequest(FACULTY1)}>
                      Request
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              ))}
              
            </div>
            <div className="container-fluid">
              {facFullInfo?.map((FACULTY, index) => (
                <ListGroup
                  key={FACULTY.id}
                  horizontal="sm"
                  className="my-2 studentlist d-flex justify-content-center"
                >
                  <ListGroup.Item style={{width:"35%", backgroundColor: "#d57c7c"}}>{FACULTY.name}</ListGroup.Item>
                  <ListGroup.Item style={{width:"35%", backgroundColor: "#d57c7c"}}>{FACULTY.email}</ListGroup.Item>
                  <ListGroup.Item style={{width:"10%", backgroundColor: "#d57c7c"}}>
                  {FACULTY.description_link==="_description_link_"?<p style={{marginBottom:"0rem"}}>No Link</p>:
                    <a href={FACULTY.description_link} target="_blank" rel="noreferrer">Link</a>}
                  </ListGroup.Item>
                  </ListGroup>
              ))}
              
            </div>
          </>
          <ToastContainer></ToastContainer>
        </>
      );
    case "requested":
      return (
        <>
          <HeaderLoginStudent></HeaderLoginStudent>
          <div style={{textAlign:"center", marginTop:"10rem", width:"100%"}}><h2>Your request has been sent to <strong>{stuInfo.faculty_name}</strong>. Please wait for the response.</h2></div>
          <ToastContainer></ToastContainer>
        </>
      );

    case "registered":
      return (
        <>
          <HeaderLoginStudent></HeaderLoginStudent>
          <div style={{textAlign:"center", marginTop:"10rem", width:"100%"}}><h2>Your request has been <span style={{color:"#12b63d"}}>approved</span> by <strong>{stuInfo.faculty_name}</strong>. Please wait for the faculty to contact you.</h2></div>
        </>
      );
    default:
      return (
        <>
          <h1 style={{textAlign:"center", marginTop:"10rem", width:"100%"}}>Session Expired. Please reload the page to authenticate.</h1>
        </>
      );
  }
};


export default Student;
