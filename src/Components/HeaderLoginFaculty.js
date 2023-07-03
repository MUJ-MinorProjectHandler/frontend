import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {findMaxNum, findNum, checkNum} from "../Services/Apis";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'
import {NavLink} from "react-router-dom";
import logo from './logo.png';
import '../styles/mix.css';



const HeaderLoginFaculty = ()=>{
    const [maxStudent,setMaxStudent] = useState();
    const [noOfStudents, setNoOfStudents] = useState();
    const navigate = useNavigate();

    const logout = async ()=>{
        sessionStorage.clear();
        navigate("/");
    };

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
    // const checknum = async ()=>{
    //     if(noOfStudents && maxStudent){
    //         if(noOfStudents<maxStudent)
    //         {
    //             const response = await checkNum();
    //             console.log(response.status);
    //         }
    //     }
    // }
    useEffect(()=>{
        findMax()
        findnum()
        // checknum()
    })
    return (
        <>
            <Navbar bg="">
            <Container>
                <Navbar.Brand href="">
                <img
                  src={require('./logo.png')}
                  width="180"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                </Navbar.Brand>
                <Navbar.Text>
                    {noOfStudents} / {maxStudent}
                </Navbar.Text>
                {/* <Navbar.Text>
                {sessionStorage.getItem("num")} / {sessionStorage.getItem("max")}
                </Navbar.Text> */}
                <Navbar.Text className="justify-content-end">
                    Signed in as: {sessionStorage.getItem("email")}
                </Navbar.Text>
                <button className='lout' onClick={logout}>Logout</button>
            </Container>
            </Navbar>
            
        </>
    )
}

export default HeaderLoginFaculty;