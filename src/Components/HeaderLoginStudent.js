import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import "../styles/mix.css";

const HeaderLoginStudent = () => {
  const navigate = useNavigate();

  const logout = async () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="" style={{marginBottom:"2rem"}}>
        <Container>
          <Navbar.Brand href="">
            <img
              src={require("./logo.png")}
              width="180"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Text className="justify-content-end">
            Signed in as: {sessionStorage.getItem("email")}
          </Navbar.Text>
          <button className="lout" onClick={logout}>
            Logout
          </button>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderLoginStudent;
