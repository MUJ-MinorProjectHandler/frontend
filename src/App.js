import Login from './Pages/Logind';
import Otp from './Pages/Otp';
import Admin from './Pages/Admin';
import Student from './Pages/Student';
import Faculty from './Pages/Faculty';
import Error from './Pages/Error';
import React, { useEffect } from "react";
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';



function App() {
  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault(); 
    }
    // add the event listener to the component's root element
    const rootElement = document.getElementById('my-component');
    rootElement.addEventListener('contextmenu', handleContextMenu);
    // remove the event listener when the component is unmounted

    return () => {
      rootElement.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <>
    <div id="my-component">
      <Routes>
        <Route path='/' element={<Login></Login>} ></Route>
        <Route path='/otp' element={<Otp></Otp>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
        <Route path='/student' element={<Student></Student>}></Route>
        <Route path='/faculty' element={<Faculty></Faculty>}></Route>
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
      </div>
    </>
  );
}

export default App;
