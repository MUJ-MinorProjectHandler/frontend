import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  findMaximum,
  setMaximum,
  datadownstudent,
  datadownfaculty,
  getFullList,
  rejectAdminStudent,
  sendDescriptionLink,
} from "../Services/Apis";
import validator from "validator";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import { confirmAlert } from "react-confirm-alert";
import HeaderLogin from "../Components/HeaderLogin";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap";
import "../styles/mix.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import { BACKEND_URL } from "../Services/helper";

const Admin = () => {
  const [students, setStudents] = useState();
  const [FacultyFile, setFacultyFile] = useState();
  const [StudentFile, setStudentFile] = useState();
  const [maxNum, setMaxNum] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const [descriptionLink, setDescriptionLink] = useState();
  const [descriptionLinkButton, setDescriptionLinkButton] = useState(true);

  const getMax = async () => {
    const response = await findMaximum();
    console.log(response.data);
    setMaxNum(response.data);
  };

  const getStudents = async () => {
    const response = await getFullList(search, page);
    // console.log(response.data.usersdata)
    if (response.status === 200) {
      if (response.data.usersdata === []) {
        toast.error("No Record");
      }
      setStudents(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      toast.error(response.response.data.error);
    }

    // console.log(response);
  };

  const putMax = async (e) => {
    e.preventDefault();
    if (maxNum === "") {
      toast.error("Enter a Number");
    } else {
      const data = {
        maxNoOfStudent: maxNum,
      };
      console.log(data);
      const response = await setMaximum(data);
      if (response.status === 200) {
        console.log(response.data.message);
        toast.success("Maximum Number of Students Updated");
      } else {
        toast.error(response.response.data.error);
      }
    }
    // console.log(response);
  };

  const sheetdownstudent = async () => {
    const response = await datadownstudent();
    console.log(response);
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error!Please try after sometime");
    }
  };

  const sheetdownfaculty = async () => {
    const response = await datadownfaculty();
    console.log(response);
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error!Please try after sometime");
    }
  };

  const uploadFacultyConfirm = async (e) => {
    if (FacultyFile) {
      confirmAlert({
        title: "Confirm to update",
        message: "Are you sure to do delete the previous records?",
        buttons: [
          {
            label: "Yes",
            onClick: () => uploadFaculty(),
          },
          {
            label: "No",
            onClick: () => setFacultyFile(""),
          },
        ],
      });
    } else {
      toast.error("Please Select a file first");
    }
  };

  const uploadFaculty = () => {
    const formData = new FormData();
    formData.append("file", FacultyFile);
    axios.post(`${BACKEND_URL}/upload/faculty`, formData, {}).then((res) => {
      console.log(res);
      toast.success("Faculty Data updated!");
    });
  };

  const uploadStudentConfirm = async (e) => {
    if (StudentFile) {
      confirmAlert({
        title: "Confirm to update",
        message: "Are you sure to do delete the previous records?",
        buttons: [
          {
            label: "Yes",
            onClick: () => uploadStudent(),
          },
          {
            label: "No",
            onClick: () => setStudentFile(""),
          },
        ],
      });
    } else {
      toast.error("Please Select a file first");
    }
  };

  const uploadStudent = () => {
    const formData = new FormData();
    formData.append("file", StudentFile);
    axios.post(`${BACKEND_URL}/upload/student`, formData, {}).then((res) => {
      console.log(res);
      toast.success("Student Data updated!");
    });
  };

  const sendReject = (email) => {
    const Data = {
      email: email,
    };
    confirmAlert({
      title: "Confirm to edit",
      message: "Are you sure want to update " + email + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            rejectAdminStudent(Data);
            toast.success("Please reload to see effect");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
    console.log(Data);
  };

  const validate = (value) => {
    if (validator.isURL(value)) {
      setDescriptionLink(value);
      setDescriptionLinkButton(false);
    } else {
      setDescriptionLinkButton(true);
    }
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

  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  useEffect(() => {
    getStudents();
  }, [search, page]);

  useEffect(() => {
    getMax();
    // getStudents();
  }, []);

  useEffect(() => {
    if (sessionStorage.userdbtoken === "qawdemritn") {
    } else {
      sessionStorage.clear();
      navigate("/");
    }
  });

  return (
    <>
      <HeaderLogin></HeaderLogin>
      {/* <section> */}
      <div className="container text-center">
        <div className="row" style={{ marginTop: "2rem" }}>
          <div className="col-sm-4">
            <div className="row">
              <h6>Upload file to add Students</h6>
              <div className="col-sm-7">
                <Form.Group
                  controlId="formFile"
                  className="mb-3"
                  enctype="multipart/form-data"
                >
                  <Form.Control
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setStudentFile(e.target.files[0])}
                    accept=".csv"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-5">
                <button
                  className="upload"
                  style={{ fontSize: "15px" }}
                  onClick={uploadStudentConfirm}
                >
                  Update Students
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <h6>Upload file to add Faculties</h6>
              <div className="col-sm-7">
                <Form.Group
                  controlId="formFile"
                  className="mb-3"
                  enctype="multipart/form-data"
                >
                  <Form.Control
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFacultyFile(e.target.files[0])}
                    accept=".csv"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-5">
                <button
                  className="upload"
                  style={{ fontSize: "15px" }}
                  onClick={uploadFacultyConfirm}
                >
                  Update Faculties
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div>
              <button
                type="button"
                class="btn btn-success"
                className="downsheet"
                onClick={sheetdownstudent}
                style={{fontSize:"15px"}}
              >
                Download Student Sheet
              </button>
            </div>
          </div>
          <div className="col-sm-2">
            <div>
              <button
                type="button"
                class="btn btn-success"
                className="downsheet"
                onClick={sheetdownfaculty}
                style={{fontSize:"15px"}}
              >
                Download Faculty Sheet
              </button>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "3rem" }}>
          {/* <div className="col col-lg-4">
              <div class="">Max No. of Students:</div>
              <input type="number" class="form-control max" id="customFile" />
            </div> */}
          <div className="col col-lg-4">
            <div className="row">
              <h6>Max No. of Students</h6>
              <div className="col-sm-4">
                <Form.Group controlId="formFile" className="mb-3">
                  {/* <Form.Label>Max No. of Students</Form.Label> */}
                  <Form.Control
                    type="number"
                    className="maxno"
                    id="maxnum"
                    value={maxNum}
                    onChange={(e) => {
                      setMaxNum(e.target.value);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-8">
                <button
                  className="upload"
                  style={{ fontSize: "15px" }}
                  onClick={putMax}
                >
                  Update Maximum Number
                </button>
              </div>
            </div>
          </div>
          <div className="col col-lg-8 search">
            <Form className="">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 searchhe"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button className="searchbtn">Search</button> */}
            </Form>
          </div>
        </div>
        <div className="row" style={{ marginTop: "3rem", marginBottom:"3rem"}}>
          <div className="col">
            <Form.Group>
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
              </Form.Group>
           </div>
        </div>
      </div>
      {/* </section> */}
      <Card className="shadow">
        <div
          style={{
            marginTop: "4rem",
            width: "90%",
            alignContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Registration No.</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Faculty Name</th>
                <th scope="col">Faculty Email</th>
                <th scope="col">Status</th>
                {/* <th scope="col">Edit</th> */}
              </tr>
            </MDBTableHead>
            {students?.map((Student, index) => (
              <MDBTableBody>
                <tr>
                  <th scope="row">{(++index)+((page-1)*50)}</th>
                  <td>{Student.name}</td>
                  <td>{Student.email}</td>
                  <td>{Student.registration_number}</td>
                  <td>{Student.phone_number}</td>
                  {/* {Student.status === "pending" ? (
                    <td>hello</td>
                  ) : (
                    <td>{Student.faculty_name}</td>
                  )} */}
                  <td>{Student.faculty_name}</td>
                  <td>{Student.faculty_mail}</td>
                  {Student.status === "pending" ? (
                    <MDBBadge
                      color="danger"
                      pill
                      style={{ marginTop: "0.5rem" }}
                    >
                      Pending
                    </MDBBadge>
                  ) : (
                    <></>
                  )}
                  {Student.status === "requested" ? (
                    <>
                      <MDBBadge
                        color="warning"
                        pill
                        style={{ marginTop: "0.5rem" }}
                      >
                        Requested
                      </MDBBadge>
                      <button
                        className="bg-transparent border-0 shadow-none"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => {
                          sendReject(Student.email);
                        }}
                      >
                        <img
                          src={require("./cross.png")}
                          width="20"
                          className="d-inline-block align-top"
                          alt="Reject"
                        />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {Student.status === "registered" ? (
                    <>
                      <MDBBadge
                        color="success"
                        pill
                        style={{ marginTop: "0.5rem" }}
                      >
                        Registered
                      </MDBBadge>
                      <button
                        className="bg-transparent border-0 shadow-none"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => {
                          sendReject(Student.email);
                        }}
                      >
                        <img
                          src={require("./cross.png")}
                          width="20"
                          className="d-inline-block align-top"
                          alt="Reject"
                        />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <td>{Student.status}</td> */}
                </tr>
              </MDBTableBody>
            ))}
          </MDBTable>
        </div>
        {pageCount > 0 ? (
          <div className="pagination_div d-flex justify-content-end mx-5">
            <Pagination style={{ color: "red" }}>
              <Pagination.Prev onClick={() => handlePrevious()} />
              {Array(pageCount)
                .fill(null)
                .map((element, index) => {
                  return (
                    <>
                      <Pagination.Item
                        key={index}
                        active={page === index + 1 ? true : false}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    </>
                  );
                })}
              <Pagination.Next onClick={() => handleNext()} />
            </Pagination>
          </div>
        ) : (
          ""
        )}
        {/* <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              /> */}
      </Card>

      <ToastContainer></ToastContainer>
    </>
  );
};

export default Admin;
