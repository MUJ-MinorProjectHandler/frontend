import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import logo from './logo.png';


const Header = ()=>{
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
        </Container>
      </Navbar>
        </>
    )
}

export default Header;