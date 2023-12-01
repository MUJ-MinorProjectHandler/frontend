import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderLoginFaculty from "../Components/HeaderLoginFaculty";
import {
  sendDescriptionLink,
  reqStudents,
  declineStudent,
  declineSelectedStudent,
  acceptStudent,
  selStudents,
  datapersonaldown,
  findMaxNum, findNum
} from "../Services/Apis";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap";
import "../styles/mix.css";

const Faculty = () => {

  const [maxStudent,setMaxStudent] = useState();
    const [noOfStudents, setNoOfStudents] = useState();

  const [descriptionLink, setDescriptionLink] = useState();
  const [reqStu, setReqStu] = useState([]);
  const [selectStu, setSelectStu] = useState();
  const [descriptionLinkButton, setDescriptionLinkButton] = useState(true);
  const navigate = useNavigate();
  const [setPage, setSetPage] = useState(true);

  const findMax = async ()=>{
    const response = await findMaxNum();
    sessionStorage.setItem("max", response.data);
    setMaxStudent(response.data);
}

const findnum = async ()=>{
    const response = await findNum();
    sessionStorage.setItem("num", response.data);
    setNoOfStudents(response.data);
}

  const sheetdown = async () => {
    const response = await datapersonaldown();
    console.log(response);
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error!Please try after sometime");
    }
  };

  const requestedStudents = async () => {
    const response = await reqStudents();
    setReqStu(response.data);
    if (reqStu !== undefined) {
      if (reqStu.length !== 0) {
        setSetPage(false);
      } else {
        setSetPage(true);
      }
    }
    // console.log(setPage)
  };

  const selectedStudents = async () => {
    const response = await selStudents();
    setSelectStu(response.data);
  };

  const declineRequest = async (data) => {
    const Data = {
      email: data,
      facultyemail: sessionStorage.getItem("email"),
    };
    declineStudent(Data);
  };

  const declineSelectedRequest = async (data) => {
    const Data = {
      email: data,
      facultyemail: sessionStorage.getItem("email"),
    };
    declineSelectedStudent(Data);
  };

  const acceptRequest = async (data) => {
    const Data = {
      email: data,
      facultyemail: sessionStorage.getItem("email"),
    };
    acceptStudent(Data);
  };

  const sendLink = async () => {
    const data = {
      description_link: descriptionLink,
    };
    const response = await sendDescriptionLink(data);
    console.log(response.status);
    if (response.status === 200) {
      toast.success(response.data.message);
    } else if (response.status === 400) {
      toast.error(response.data.message);
    }
  };

  const validate = (value) => {
    if (validator.isURL(value)) {
      setDescriptionLink(value);
      setDescriptionLinkButton(false);
    } else {
      setDescriptionLinkButton(true);
    }
  };

//   useEffect(()=>{
//     findMax()
//     findnum()
//     // checknum()
// })

  useLayoutEffect(() => {
    requestedStudents();
  }, [reqStu]);

  useLayoutEffect(() => {
    selectedStudents();
  });

  useLayoutEffect(() => {
    if (sessionStorage.userdbtoken === "qfwaecrutlytuy") {
    } else {
      sessionStorage.clear();
      navigate("/");
    }
  }, []);

  return (
    <>
      <HeaderLoginFaculty></HeaderLoginFaculty>
      <section>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              {/* <Form.Group>
                <Form.Label>
                  Insert a <strong>Public Drive Link</strong> containing the
                  Project Description
                </Form.Label>
                <div className="row">
                  <div className="col-sm-10">
                    <Form.Control
                      type="text"
                      name="project_description"
                      onChange={(e) => {
                        validate(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-sm-2">
                    <button
                      className="upload"
                      onClick={sendLink}
                      disabled={descriptionLinkButton}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </Form.Group> */}
            </div>
            {/* <div>
              {noOfStudents} / {maxStudent}
            </div> */}
            <div className="col">
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  className="downsheet"
                  onClick={sheetdown}
                >
                  Download Sheet
                </button>
              </div>
            </div>
          </div>
          <hr style={{ margin: 50 }}></hr>
          <div className="row"></div>
        </div>
        <div className="container-fluid">
          {selectStu?.map((selectedstudents) => (
            // <a href="www.google.com" style={{ textDecoration: "none" }}>
            <ListGroup
              key={selectedstudents}
              horizontal="sm"
              className="my-2 studentlist d-flex justify-content-center"
            >
              <ListGroup.Item
                style={{ width: "40%", backgroundColor: "#bad9c2" }}
              >
                {selectedstudents.name}
              </ListGroup.Item>
              <ListGroup.Item
                style={{ width: "40%", backgroundColor: "#bad9c2" }}
              >
                {selectedstudents.registration_number}
              </ListGroup.Item>
              <ListGroup.Item
                style={{ width: "20%", backgroundColor: "#bad9c2" }}
              >
                {selectedstudents.phone_number}
              </ListGroup.Item>
              {/* <ListGroup.Item
                style={{ width: "10%", backgroundColor: "#bad9c2" }}
              >
                <button
                  className="declinebtn"
                  onClick={() => declineSelectedRequest(selectedstudents.email)}
                >
                  Reject
                </button>
              </ListGroup.Item> */}
            </ListGroup>
            // </a>
          ))}
        </div>
        <div className="container-fluid">
           {   
                setPage ? (<h5 style={{textAlign:"center", width:"100%"}}>No new requests</h5> ):(<>
                  {reqStu?.map((students) => (
                    <ListGroup
                      key={students}
                      horizontal="sm"
                      className="my-2 studentlist d-flex justify-content-center"
                    >
                      <ListGroup.Item style={{ width: "30%" }}>
                        {students.name}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ width: "30%" }}>
                        {students.registration_number}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ width: "20%" }}>
                        {students.phone_number}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ width: "10%" }}>
                        <button
                          className="requestbtn"
                          onClick={() => acceptRequest(students.email)}
                        >
                          Accept
                        </button>
                      </ListGroup.Item>
                      <ListGroup.Item style={{ width: "10%" }}>
                        <button
                          className="declinebtn"
                          onClick={() => declineRequest(students.email)}
                        >
                          Decline
                        </button>
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </>)
            }   
        </div>
      </section>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Faculty;
